const Discord = require("discord.js");
const mongoose = require("mongoose");
require('dotenv').config();

const mongoDBurl = process.env.MongoDB_String;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

mongoose
  .connect(mongoDBurl, {
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

client.login(process.env.token);
