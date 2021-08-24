const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

module.exports = async ({
  dir = 'migrations',
  store,
  emitter = new EventEmitter()
}) => {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory '${dir}' doesn't exist`);
  }

  if (!store) {
    throw new Error(`Store must be specified.`);
  }

  await migrate(dir, store, emitter);
};

async function migrate(dir, store, emitter) {
  const dirFiles = await find(dir);
  const storedFiles = (await store.get()) || [];
  const files = dirFiles.filter(file => !storedFiles.includes(file));

  for (const file of files) {
    try {
      emitter.emit('start', file);

      await exec(dir, file);
      storedFiles.push(file);

      emitter.emit('finish', file);
    } catch (err) {
      emitter.emit('error', err, file);
      return;
    } finally {
      await store.set(storedFiles);
    }
  }
}

async function find(dir) {
  const files = await new Promise((resolve, reject) =>
    fs.readdir(dir, (err, files) => (err ? reject(err) : resolve(files)))
  );

  return files
    .filter(name => name[0] !== '.')
    .sort((fstName, secName) => fstName.localeCompare(secName));
}

async function exec(dir, file) {
  let migrate;
  try {
    migrate = require(path.resolve(dir, file));
  } catch (err) {
    throw new Error(
      `Error when importing migration "${file}":\n  ${err.stack}`
    );
  }

  if (typeof migrate !== 'function') {
    throw new Error(`The migration "${file}" doesn't export a function`);
  }

  try {
    await migrate();
  } catch (err) {
    throw new Error(
      `Error when executing migration "${file}":\n  ${err.stack}`
    );
  }
}
