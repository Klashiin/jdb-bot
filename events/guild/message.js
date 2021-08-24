const profileModel = require("../../models/profileSchema");

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
        wins: 1,
        losses: 1,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command) command.execute(client, message, args, Discord, profileData);
};
