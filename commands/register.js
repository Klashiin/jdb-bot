const profileModel = require("../models/profileSchema");

module.exports = {
  name: "register",
  description: "Registra seu perfil no JdB Bot.",
  execute: async function (client, message, args, Discord) {
    let profileData;
    try {
      profileData = await profileModel.findOne({userID: message.author.id});
      if (!profileData) {
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
