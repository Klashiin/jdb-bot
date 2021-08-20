const profileModel = require("../models/profileSchema");

module.exports = {
  name: "register",
  description: "Registra seu perfil no JdB Bot.",
  execute: async function (client, message, args, Discord, profileData) {
    try {
      if (profileData === undefined) {
        let profile = await profileModel.create({
          userID: message.author.id,
          serverID: message.guild.id,
          pontos: 1000,
          lastDaily: 0,
          dailyStreak: 1,
        });
        profile.save();
        message.reply("Seu perfil foi registrado com sucesso.");
      } else {
        message.reply("Seu perfil já está registrado!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
