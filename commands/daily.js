const { countDocuments } = require("../models/profileSchema");
const profileModel = require("../models/profileSchema");
module.exports = {
  name: "daily",
  description: "Coleta o bônus diário (se disponível).",
  async execute(client, message, args, Discord, profileData) {
    if (profileData.isDailyAvailable) {
      const cooldown = 60000;
      console.log("true");
      console.log(profileData.dailyStreak);
      // Aumanetando dailyStreak em 1:
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
      // Atualizar isDailyAvailable:
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            isDailyAvailable: false,
          },
        }
      );
      // Passar timeout de 24 horas e então atualizar isDailyAvailable novamente:
      setTimeout(async function () {
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $set: {
              isDailyAvailable: true,
            },
          }
        );
      }, cooldown);
    } else {
      console.log("false");
      message.reply("seu bônus diário já foi coletado hoje.");
    }
  },
};
