const profileModel = require("../../models/profileSchema");
const {Collection} = require("discord.js");
const Timeout = new Collection();
const ms = require("ms");

module.exports = async (Discord, client, message) => {
  const prefix = "~";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await profileModel.findOne({userID: message.author.id});
    if (!profileData) {
      let profile = await profileModel.create({
        name: message.author.username,
        userID: message.author.id,
        serverID: message.guild.id,
        pontos: 1000,
        lastDaily: 0,
        dailyStreak: 1,
        wins: 0,
        losses: 0,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command)
    if (command.cooldown) {
      if (Timeout.has(`${command.name}${message.author.id}`))
        return message.channel.send(
          `Você está em um cooldown de \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            {long: true}
          )}\`.`
        );
      command.execute(client, message, args, Discord, profileData);
      Timeout.set(
        `${command.name}${message.author.id}`,
        Date.now() + command.cooldown
      );
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`);
      }, command.cooldown);
    } else {
      command.execute(client, message, args, Discord, profileData);
    }
};
