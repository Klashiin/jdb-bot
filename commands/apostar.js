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
    if (quantia % 1 != 0 || quantia <= 0)
      return message.reply(
        "A quantia a ser paga tem que ser um número inteiro positivo."
      );
  },
};
