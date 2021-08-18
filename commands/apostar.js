module.exports = {
  name: "apostar",
  description:
    "~apostar [quantia] [bicho] : aposta x pontos no bicho especificado.",
  execute(client, message, args, Discord, profileData) {
    // Definindo os argumentos:
    const quantia = args[0];
    const bicho = args[1];
    console.log(quantia);
    console.log(bicho);
    // Checagens:
    if (!args.length)
      return message.reply(
        "Você precisa inserir uma quantia para usar esse comando!"
      );
    if (quantia % 1 != 0 || quantia <= 0)
      return message.reply(
        "A quantia a ser paga tem que ser um número inteiro positivo."
      );
    // RANDOM NUMVERZZZ
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randonNumber = getRandomInt(1000, 9999);
    console.log(randomNumber);
    console.log(randomNumber.toString().substr(-2));
  },
};
