const profileModel = require("../../models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    pontos: 1000,
    isDailyAvailable: true,
    dailyStreak: 1,
  });
  profile.save();
};