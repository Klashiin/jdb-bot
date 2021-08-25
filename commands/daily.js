const {countDocuments} = require("../models/profileSchema");
const profileModel = require("../models/profileSchema");
module.exports = {
  name: "daily",
  description: "Coleta o bônus diário (se disponível).",
  async execute(client, message, args, Discord, profileData) {
    if (profileData != null) {
      const cooldown = 86400000;
      let lastDaily = profileData.lastDaily;
      if (lastDaily + cooldown <= Date.now()) {
        console.log("true");
        // Definindo o bônus diário:
        let bonus;
        if (profileData.dailyStreak >= 10) {
          bonus = 5 * 250;
        } else {
          bonus = (profileData.dailyStreak / 2) * 250;
        }
        // Dando os pontos pro usuário:
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              pontos: bonus,
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
        // Atualizar lastDaily:
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              lastDaily: Date.now(),
            },
          }
        );
        // Aumentando a streak do usuário:
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              dailyStreak: 1,
            },
          }
        );
      } else {
        console.log("false");
        message.reply("seu bônus diário já foi coletado hoje.");
      }
    }
  },
};
