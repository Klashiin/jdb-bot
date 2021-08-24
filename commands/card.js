const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "card",
  description: "Exibe um cartão com seus dados do jogo.",
  execute(client, message, args, Discord, profileData) {
    const cardEmbed = new MessageEmbed()
      .setTitle(`${profileData.name}'s Bicheiro Card`)
      .setColor("5865F2")
      .addField(
        `${profileData.wins} Vitórias / ${profileData.losses} Derrotas`,
        `${profileData.wins + profileData.losses} partidas jogadas.`
      );
    message.channel.send(cardEmbed);
  },
};
