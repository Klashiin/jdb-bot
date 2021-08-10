const profileModel = require("../models/profileSchema");
module.exports = {
  name: "pay",
  description:
    "~pay [@usuário] [quantia] : paga ao @usuário a quantia especificada.",
  execute: async function (client, message, args, Discord, profileData) {
    // Definindo os argumentos:
    const quantia = args[1];
    const target = message.mentions.users.first();
    // Checagens dos argumentos passados:
    if (!args.length)
      return message.reply(
        "Você precisa marcar um usuário para usar esse comando!"
      );
    if (!target) return message.reply("Esse usuário não existe.");
    if (quantia % 1 != 0 || quantia <= 0)
      return message.reply(
        "A quantia a ser paga tem que ser um número inteiro positivo."
      );
    try {
      const targetData = await profileModel.findOne({userID: target.id});
      // Criando o perfil pra target, caso não exista:
      if (!targetData) {
        await profileModel.findOneAndUpdate(
          {
            userID: target.id,
          },
          {
            $set: {
              userID: target.id,
              serverID: message.guild.id,
              pontos: 1000,
              isDailyAvailable: true,
              dailyStreak: 1,
            },
          }
        );
      }
      // Dando os pontos para target:
      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            pontos: quantia,
          },
        }
      );
      // Subtraindo os pontos de quem pagou:
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            pontos: -quantia,
          },
        }
      );
      // Exibindo isso num embed bonitinho:
      const payEmbed = new Discord.MessageEmbed()
        .setTitle("Pagamento Recebido")
        .addFields({
          name: `${quantia} pontos`,
          value: `<@${message.author.id}> pagou <@${target.id}>!`,
        })
        .setColor("#118C4F");
      message.channel.send(payEmbed);
    } catch (err) {
      console.log(err);
    }
  },
};
