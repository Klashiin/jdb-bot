module.exports = {
  name: "listabichos",
  description: "Exibe uma lista com todos os bichos do JdB.",
  execute(client, message, args, Discord, profileData) {
    const allowedBichos = [
      "avestruz",
      "águia",
      "burro",
      "borboleta",
      "cachorro",
      "cabra",
      "carneiro",
      "camelo",
      "cobra",
      "coelho",
      "cavalo",
      "elefante",
      "galo",
      "gato",
      "jacaré",
      "leão",
      "macaco",
      "porco",
      "pavão",
      "peru",
      "touro",
      "tigre",
      "urso",
      "veado",
      "vaca",
    ];

    function createObj() {
      let obj = [];
      let i = 0;
      for (const bicho of allowedBichos) {
        obj[i] = {name: bicho.toUpperCase()};
        i++;
      }
      return obj;
    }

    const listaEmbed = new Discord.MessageEmbed()
      .setTitle("Lista de Bichos")
      .setColor("#5865F2")
      .addFields(createObj());
    message.channel.send(listaEmbed);
  },
};
