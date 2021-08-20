const profileModel = require("../models/profileSchema");

module.exports = {
  name: "register",
  description: "Registra seu perfil no JdB Bot.",
  execute: async function (client, message, args, Discord, profileData) {
    if (!profileData) {
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            userID: message.author.id,
            serverID: message.guild.id,
            pontos: 1000,
            lastDaily: 0,
            dailyStreak: 1,
          },
        }
      );
      message.reply("seu perfil foi registrado.");
    } else {
      message.reply("seu perfil já está registrado!");
    }
  },
};
