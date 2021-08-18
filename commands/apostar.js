const profileModel = require("../models/profileSchema");

module.exports = {
  name: "apostar",
  description:
    "~apostar [quantia] [bicho] : aposta x pontos no bicho especificado.",
  async execute(client, message, args, Discord, profileData) {
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
    if (bicho === undefined) {
      return message.reply(
        "Você precisa inserir um bicho para usar esse comando!"
      );
    }
    let allow = false;
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
    for (let i = 0; i < allowedBichos.length; i++) {
      if (allowedBichos[i] == bicho) {
        allow = true;
      }
    }
    if (!allow) {
      return message.reply("Por favor, insira um bicho válido!");
    }
    // Se passar as checagens, subtrair a quantia
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          pontos: -quantia,
        },
      }
    );
    // RANDOM NUMVERZZZ
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randomNumber = getRandomInt(1000, 9999);
    const dezena = randomNumber.toString().substr(-2);
    console.log(randomNumber);
    console.log(dezena);
    // Definir bichoSorteado baseado na dezena:
    if (dezena >= 01 && dezena <= 04) {
      bichoSorteado = "avestruz";
    } else if (dezena >= 05 && dezena <= 08) {
      bichoSorteado = "águia";
    } else if (dezena >= 09 && dezena <= 12) {
      bichoSorteado = "burro";
    } else if (dezena >= 13 && dezena <= 16) {
      bichoSorteado = "borboleta";
    } else if (dezena >= 17 && dezena <= 20) {
      bichoSorteado = "cachorro";
    } else if (dezena >= 21 && dezena <= 24) {
      bichoSorteado = "cabra";
    } else if (dezena >= 25 && dezena <= 28) {
      bichoSorteado = "carneiro";
    } else if (dezena >= 29 && dezena <= 32) {
      bichoSorteado = "camelo";
    } else if (dezena >= 33 && dezena <= 36) {
      bichoSorteado = "cobra";
    } else if (dezena >= 37 && dezena <= 40) {
      bichoSorteado = "coelho";
    } else if (dezena >= 41 && dezena <= 44) {
      bichoSorteado = "cavalo";
    } else if (dezena >= 45 && dezena <= 48) {
      bichoSorteado = "elefante";
    } else if (dezena >= 49 && dezena <= 52) {
      bichoSorteado = "galo";
    } else if (dezena >= 53 && dezena <= 56) {
      bichoSorteado = "gato";
    } else if (dezena >= 57 && dezena <= 60) {
      bichoSorteado = "jacaré";
    } else if (dezena >= 61 && dezena <= 64) {
      bichoSorteado = "leão";
    } else if (dezena >= 65 && dezena <= 68) {
      bichoSorteado = "macaco";
    } else if (dezena >= 69 && dezena <= 72) {
      bichoSorteado = "porco";
    } else if (dezena >= 73 && dezena <= 76) {
      bichoSorteado = "pavão";
    } else if (dezena >= 77 && dezena <= 80) {
      bichoSorteado = "peru";
    } else if (dezena >= 81 && dezena <= 84) {
      bichoSorteado = "touro";
    } else if (dezena >= 85 && dezena <= 88) {
      bichoSorteado = "tigre";
    } else if (dezena >= 89 && dezena <= 92) {
      bichoSorteado = "urso";
    } else if (dezena >= 93 && dezena <= 96) {
      bichoSorteado = "veado";
    } else if ((dezena >= 97 && dezena <= 99) || dezena == 00) {
      bichoSorteado = "vaca";
    }
    // Exibir um embed com o bicho vencedor
    const resultEmbed = new Discord.MessageEmbed()
      .setTitle("RESULTADO DO BICHO")
      .setColor("#f54272")
      .addFields({
        name: `${bichoSorteado}`,
        value: `Aposta x18`,
      });
    message.channel.send(resultEmbed);
    // Comparar bicho com bichoSorteado e recompensar se forem iguais:
    if (bicho == bichoSorteado) {
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            pontos: quantia * 18,
          },
        }
      );
      return message.reply(
        `Você acertou o bicho e ganhou ${quantia * 18} pontos.`
      );
    } else {
      return message.reply(
        `O bicho escolhido (${bicho}) não foi sorteado dessa vez...`
      );
    }
  },
};
