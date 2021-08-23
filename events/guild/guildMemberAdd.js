const profileModel = require("../../models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    name: client.users.cache.find((user) => user.id === member.id),
    userID: member.id,
    serverID: member.guild.id,
    pontos: 1000,
    lastDaily: 0,
    dailyStreak: 1,
  });
  profile.save();
};
