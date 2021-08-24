const profileModel = require("../../models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    name: member.user.username,
    userID: member.id,
    serverID: member.guild.id,
    pontos: 1000,
    lastDaily: 0,
    dailyStreak: 1,
    wins: 1,
    losses: 1,
  });
  profile.save();
};
