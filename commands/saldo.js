module.exports = {
  name: "saldo",
  description: "Exibe a quantidade de pontos na sua conta.",
  execute: function (client, message, args, Discord, profileData) {
    const saldoEmbed = new Discord.MessageEmbed()
      .setTitle("Saldo Disponível")
      .addFields({name: `${profileData.pontos} pontos`, value: ":dollar: :dollar: :dollar:"})
      .setColor("#118C4F");
    message.channel.send(saldoEmbed);
  },
};
