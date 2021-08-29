const {countDocuments} = require("../models/profileSchema");
const profileModel = require("../models/profileSchema");
module.exports = {
  name: "daily",
  description: "Coleta o bônus diário (se disponível).",
  cooldown: 1000 * 60 * 60 * 24,
  async execute(client, message, args, Discord, profileData) {
    if (profileData != null) {
        // Definindo o bônus diário:
        let bonus;
        if (profileData.dailyStreak >= 10) {
          bonus = 5 * 250;
        } else {
          bonus = (profileData.dailyStreak / 2) * 250;
        }
        // Dando os pontos pro usuário e aumtandno a streak:
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              pontos: bonus,
              dailyStreak: 1,
            },
          }
        );
        // Exibindo isso num embed bonitinho:
        const dailyEmbed = new Discord.MessageEmbed()
          .setTitle("Bônus Diário")
          .addFields({
            name: `${bonus} pontos`,
            value: `<@${message.author.id}> está numa sequência de: ${profileData.dailyStreak}!`,
          })
          .setColor("#f54272");
        message.channel.send(dailyEmbed);
      }
  },
};
