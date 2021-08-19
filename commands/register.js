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
          lastDaily: 0,
          pontos: 1000,
          dailyStreak: 1,
        });
        profile.save();
        message.reply("seu perfil foi criado e registrdo com sucesso.");
      } else {
        message.reply("seu perfil já está registrado!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
