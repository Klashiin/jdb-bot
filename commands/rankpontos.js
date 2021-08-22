const profileModel = require("../models/profileSchema");

module.exports = {
  name: "rankpontos",
  description: "Exibe um ranking dos membros do servidor, baseado nos pontos.",
  async execute(client, message, args, Discord, profileData) {
    profileModel
      .find({serverID: message.guild.id})
      .sort([["pontos", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let rankEmbed = new Discord.MessageEmbed().setTitle(
          "Ranking de Pontos"
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
            let memberID = res[i].userID;
            let member = await client.fetchUser(memberID);
            rankEmbed.addField(
              `${i + 1}. ${member.tag}`,
              `${member.pontos} pontos`
            );
          }
        } else {
          // se tiverem mais de 10 resultados
          rankEmbed.setColor("#5865F2");
          for (i = 0; i < 10; i++) {
            let memberID = res[i].userID;
            let member = await client.fetchUser(memberID);
            rankEmbed.addField(
              `${i + 1}. ${member.tag}`,
              `${member.pontos} pontos`
            );
          }
        }
        message.channel.send(rankEmbed);
      });
  },
};
