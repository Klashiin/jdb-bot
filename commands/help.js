const fs = require("fs");

module.exports = {
  name: "help",
  description: "Exibe uma lista de todos os comandos e suas descrições.",
  execute(client, message, args, Discord) {
    const commandFiles = fs
      .readdirSync("./commands/")
      .filter((file) => file.endsWith(".js"));

    function createObj() {
      let obj = [];
      let i = 0;
      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        obj[i] = { name: process.env.prefix + command.name, value: command.description};
        i++;
      }
      return obj;
    }

    const helpEmbed = new Discord.MessageEmbed()
      .setTitle("Lista de Comandos")
      .addFields(createObj())
      .setColor("#7289da");

    message.channel.send(helpEmbed);
  },
};
