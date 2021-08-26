const profileModel = require("../models/profileSchema");

module.exports = {
  name: "trabalhar",
  description: "Ganha uma quantia aleatória de pontos.",
  async execute(client, message, args, Discord, profileData) {
    // Definir a quantia através de número aleatório
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randomNumber = getRandomInt(80, 250);
    console.log(randomNumber);
    // Dar os pontos para o usuário
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          pontos: randomNumber,
        },
      }
    );
    // Exibir isso num embed bonitinho
    const workEmbed = new Discord.MessageEmbed()
      .setColor("#118C4F")
      .setTitle("Resultado")
      .addField(
        `${profileData.name} trabalhou e recebeu seu pagamento!`,
        `${randomNumber} pontos`
      );
    message.channel.send(workEmbed);
  },
};
