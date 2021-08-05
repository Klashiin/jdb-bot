const Discord = require("discord.js");
const token = process.env.DiscordToken;
const client = new Discord.Client();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

mongoose
  .connect(process.env.MongoDBConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

client.login(token);
