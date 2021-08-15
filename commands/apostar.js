module.exports = {
  name: "apostar",
  description:
    "~apostar [quantia] [bicho] : aposta x pontos no bicho especificado.",
  execute(client, message, args, Discord, profileData) {
    const quantia = args[1];
    console.log(quantia);
  },
};
