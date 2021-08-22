const bichoModel = require("../models/bichoSchema");

module.exports = {
  name: "rankbichos",
  description: "Exibe um ranking dos bichos, por vitórias no jogo.",
  execute(client, message, args, Discord, profileData) {
    bichoModel
      .find({})
      .sort([["totalWins", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let rankEmbed = new Discord.MessageEmbed().setTitle(
          "Ranking dos Bichos"
        );
        if (res.length === 0) {
          // se não tiverem resultados
          rankEmbed.setColor("RED");
          rankEmbed.addField(
            "Nenhum dado encontrado",
            "Use ~apostar para jogar!"
          );
        } else if (res.length < 10) {
          // se tiverem menos de 10 resultados
          rankEmbed.setColor("#5865F2");
          for (i = 0; i < res.length; i++) {
            let bicho = res[i].nome;
            let wins = res[i].totalWins;
            let emoji = res[i].emoji;
            rankEmbed.addField(
              `${i + 1}. ${bicho} ${emoji}`,
              `${wins} vitórias`
            );
          }
        } else {
          // se tiverem mais de 10 resultados
          rankEmbed.setColor("#5865F2");
          for (i = 0; i < 10; i++) {
            let bicho = res[i].nome;
            let wins = res[i].totalWins;
            let emoji = res[i].emoji;
            rankEmbed.addField(
              `${i + 1}. ${bicho} ${emoji}`,
              `${wins} vitórias`
            );
          }
        }
        message.channel.send(rankEmbed);
      });
  },
};
