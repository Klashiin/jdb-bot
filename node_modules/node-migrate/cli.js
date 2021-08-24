#!/usr/bin/env node

const path = require('path');
const EventEmitter = require('events');

const arg = require('arg');

const migrate = require('.');
const { version } = require('./package');

const help = `
Usage: node-migrate [options] [command]

Options:
  -d, --dir         Specify migrations directory - default: migrations
  -h, --help        Print usage
  -s, --store       Specify state storage
  -v, --version     Print version
`;

const spec = {
  '--dir': String,
  '-d': '--dir',

  '--help': Boolean,
  '-h': '--help',

  '--store': String,
  '-s': '--store',

  '--version': Boolean,
  '-v': '--version'
};

let args = arg(spec, { permissive: true });

if (args['--help']) {
  console.log(help);
  process.exit();
}

if (args['--version']) {
  console.log(version);
  process.exit();
}

let dir;
if (args['--dir']) {
  dir = args['--dir'];
}

let store;
if (args['--store']) {
  let id = args['--store'];

  if (id[0] === '.') {
    id = path.join(process.cwd(), id);
  }

  let mod;
  try {
    mod = require(id);
  } catch (err) {
    console.log(`Error when importing store "${id}":\n  ${err.stack}`);
    process.exit(1);
  }

  if (typeof mod !== 'function') {
    console.log(`The "${id}" doesn't export a function`);
    process.exit(1);
  }

  let options;
  if (mod.cli) {
    args = arg(mod.cli.spec, {
      argv: args._,
      permissive: true
    });

    options = mod.cli.getOptions(args);
  }

  store = mod(options);
}

arg({}, { argv: args._ });

const emitter = new EventEmitter()
  .on('start', file => {
    process.stdout.write(`${file}: running`);
  })
  .on('finish', file => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${file}: succeeded'}\n`);
  })
  .on('error', (err, file) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${file}: failed'}\n\n`);

    process.stdout.write(err.message);
  });

migrate({
  dir,
  store,
  emitter
}).catch(err => {
  console.log(`${err.message}`);
  process.exit(1);
});
