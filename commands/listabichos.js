module.exports = {
  name: "listabichos",
  description: "Exibe uma lista com todos os bichos do JdB.",
  execute(client, message, args, Discord, profileData) {
    const allowedBichos = [
      {name: "Avestruz", value: ":bird: :bird: :bird:"},
      {name: "Águia", value: ":eagle: :eagle: :eagle:"},
      {name: "Burro", value: ":horse: :horse: :horse:"},
      {name: "Borboleta", value: ":butterfly: :butterfly: :butterfly:"},
      {name: "Cachorro", value: ":dog: :dog: :dog:"},
      {name: "Cabra", value: ":goat: :goat: :goat:"},
      {name: "Carneiro", value: ":ram: :ram: :ram:"},
      {name: "Camelo", value: ":camel: :camel: :camel:"},
      {name: "Cobra", value: ":snake: :snake: :snake:"},
      {name: "Coelho", value: ":rabbit: :rabbit: :rabbit:"},
      {name: "Cavalo", value: ":horse: :horse: :horse:"},
      {name: "Elefante", value: ":elephant: :elephant: :elephant:"},
      {name: "Galo", value: ":rooster: :rooster: :rooster:"},
      {name: "Gato", value: ":cat2: :cat2: :cat2:"},
      {name: "Jacaré", value: ":crocodile: :crocodile: :crocodile:"},
      {name: "Leão", value: ":lion: :lion: :lion:"},
      {name: "Macaco", value: ":monkey: :monkey: :monkey:"},
      {name: "Porco", value: ":pig:: :pig: :pig:"},
      {name: "Pavão", value: ":peacock:: :peacock: :peacock:"},
      {name: "Peru", value: ":turkey:: :turkey: :turkey:"},
      {name: "Touro", value: ":ox:: :ox: :ox:"},
      {name: "Tigre", value: ":tiger:: :tiger: :tiger:"},
      {name: "Urso", value: ":bear:: :bear: :bear:"},
      {name: "Veado", value: ":deer:: :deer: :deer:"},
      {name: "Vaca", value: ":cow:: :cow: :cow:"},
    ];

    const listaEmbed = new Discord.MessageEmbed()
      .setTitle("Lista de Bichos")
      .setColor("#5865F2")
      .addFields(allowedBichos);
    message.channel.send(listaEmbed);
  },
};
