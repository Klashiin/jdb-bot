const profileModel = require("../models/profileSchema");

module.exports = {
  name: "rankwins",
  description: "Exibe um ranking dos membros do servidor, baseado nas vitórias no jogo.",
  async execute(client, message, args, Discord, profileData) {
    profileModel
      .find({})
      .sort([["wins", "descending"]])
      .exec(async (err, res) => {
        if (err) console.log(err);

        let rankEmbed = new Discord.MessageEmbed().setTitle(
          "Ranking de Vitórias"
        );
        if (res.length === 0) {
          // se não tiverem resultados
          rankEmbed.setColor("RED");
          rankEmbed.addField(
            "Nenhum dado encontrado",
            "Ganhe pontos apostando ou pegando sua daily!"
          );
        } else if (res.length < 10) {
          // se tiverem menos de 10 resultados
          rankEmbed.setColor("#5865F2");
          for (i = 0; i < res.length; i++) {
            let member = res[i].name;
            rankEmbed.addField(
              `${i + 1}. ${member}`,
              `${res[i].wins} Vitórias / ${res[i].losses} Derrotas`
            );
          }
        } else {
          // se tiverem mais de 10 resultados
          rankEmbed.setColor("#5865F2");
          for (i = 0; i < 10; i++) {
            let member = res[i].name;
            rankEmbed.addField(
              `${i + 1}. ${member}`,
              `${res[i].wins} Vitórias / ${res[i].losses} Derrotas`
            );
          }
        }
        message.channel.send(rankEmbed);
      });
  },
};
