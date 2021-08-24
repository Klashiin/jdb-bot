const profileModel = require("../models/profileSchema");
const bichoModel = require("../models/bichoSchema");

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
    if (allow === false) {
      return message.reply("Por favor, insira um bicho válido!");
    }
    if (profileData.pontos - quantia < 0) {
      return message.reply("Seu saldo é insuficiente.");
    }
    if (quantia < 100) {
      return message.reply("A aposta mínima é de 100 pontos.");
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
      imagem =
        "https://media0.giphy.com/media/4JSAeVRSI8VG5lGtiT/giphy.gif?cid=e1bb72ff5c456096774449594159160b";
      emoji = ":bird:";
    } else if (dezena >= 05 && dezena <= 08) {
      bichoSorteado = "águia";
      imagem = "https://c.tenor.com/hFNobzSfOZsAAAAC/%C3%A1guia-eagle.gif";
      emoji = ":eagle:";
    } else if (dezena >= 09 && dezena <= 12) {
      bichoSorteado = "burro";
      imagem = "https://c.tenor.com/XTiqQYf6f_UAAAAM/no-donkeys.gif";
      emoji = ":horse:";
    } else if (dezena >= 13 && dezena <= 16) {
      bichoSorteado = "borboleta";
      imagem = "https://media2.giphy.com/media/taIN8qu0tqMw/giphy.gif";
      emoji = ":butterfly:";
    } else if (dezena >= 17 && dezena <= 20) {
      bichoSorteado = "cachorro";
      imagem = "https://images.gamebanana.com/img/ico/sprays/61118a0b23ab7.gif";
      emoji = ":dog:";
    } else if (dezena >= 21 && dezena <= 24) {
      bichoSorteado = "cabra";
      imagem =
        "https://66.media.tumblr.com/61616edea0360f1b8f91177ad3824ba8/180510d851ab8c9b-fa/s250x400/4f6f5fb5697f75f23ca0145abd6be3a58802544a.gif";
      emoji = ":goat:";
    } else if (dezena >= 25 && dezena <= 28) {
      bichoSorteado = "carneiro";
      imagem =
        "https://i.pinimg.com/originals/8c/51/c4/8c51c45de0b90ce5483f31aa305de1d8.gif";
      emoji = ":ram:";
    } else if (dezena >= 29 && dezena <= 32) {
      bichoSorteado = "camelo";
      imagem =
        "https://pa1.narvii.com/6356/adc9bf9a2d591e19e8d1c596fd557269a95d5a77_hq.gif";
      emoji = ":camel:";
    } else if (dezena >= 33 && dezena <= 36) {
      bichoSorteado = "cobra";
      imagem =
        "https://i.pinimg.com/originals/9a/9c/e4/9a9ce43049590cee3c9e011dfcea78f5.gif";
      emoji = ":snake:";
    } else if (dezena >= 37 && dezena <= 40) {
      bichoSorteado = "coelho";
      imagem =
        "https://i.pinimg.com/originals/91/8f/1b/918f1b2c568be3d77a7c29d682be874c.gif";
      emoji = ":rabbit:";
    } else if (dezena >= 41 && dezena <= 44) {
      bichoSorteado = "cavalo";
      imagem =
        "https://i.pinimg.com/originals/36/f2/41/36f24141bc15986e09e7a3f75893bd33.gif";
      emoji = ":horse:";
    } else if (dezena >= 45 && dezena <= 48) {
      bichoSorteado = "elefante";
      imagem =
        "https://i.pinimg.com/originals/d3/a9/33/d3a933d1771418b826c970f4c95ce6f3.gif";
      emoji = ":elephant:";
    } else if (dezena >= 49 && dezena <= 52) {
      bichoSorteado = "galo";
      imagem =
        "https://i.pinimg.com/originals/b0/f6/68/b0f6685e60fb207fd98644d876e46daa.gif";
      emoji = ":rooster:";
    } else if (dezena >= 53 && dezena <= 56) {
      bichoSorteado = "gato";
      imagem = "https://media4.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif";
      emoji = ":cat2:";
    } else if (dezena >= 57 && dezena <= 60) {
      bichoSorteado = "jacaré";
      imagem = "https://thumbs.gfycat.com/GlassAgitatedKudu-max-1mb.gif";
      emoji = ":crocodile:";
    } else if (dezena >= 61 && dezena <= 64) {
      bichoSorteado = "leão";
      imagem = "https://media0.giphy.com/media/FGbIgRIqSrsIw/giphy.gif";
      emoji = ":lion:";
    } else if (dezena >= 65 && dezena <= 68) {
      bichoSorteado = "macaco";
      imagem = "https://c.tenor.com/jHif6boX0hAAAAAM/shocked-shook.gif";
      emoji = ":monkey:";
    } else if (dezena >= 69 && dezena <= 72) {
      bichoSorteado = "porco";
      imagem = "https://c.tenor.com/aGVLdbYSFngAAAAM/cute-pig-polite-pig.gif";
      emoji = ":pig:";
    } else if (dezena >= 73 && dezena <= 76) {
      bichoSorteado = "pavão";
      imagem = "https://c.tenor.com/G5z-j_3CwSYAAAAC/peacock-bird.gif";
      emoji = ":peacock:";
    } else if (dezena >= 77 && dezena <= 80) {
      bichoSorteado = "peru";
      imagem =
        "https://c.tenor.com/0RMAhpnpJrsAAAAC/big-neck-dancing-turkey.gif";
      emoji = ":turkey:";
    } else if (dezena >= 81 && dezena <= 84) {
      bichoSorteado = "touro";
      imagem = "https://c.tenor.com/8QNIw_1FdSQAAAAM/pica-pau-touro.gif";
      emoji = ":ox:";
    } else if (dezena >= 85 && dezena <= 88) {
      bichoSorteado = "tigre";
      imagem =
        "http://78.media.tumblr.com/2b1c51b175ab38be17cc6f8f44338df3/tumblr_oz359wVzHP1wedvnko1_500.gif";
      emoji = ":tiger:";
    } else if (dezena >= 89 && dezena <= 92) {
      bichoSorteado = "urso";
      imagem = "http://media.tumblr.com/tumblr_m9e1ekm8db1qkm21w.gif";
      emoji = ":bear:";
    } else if (dezena >= 93 && dezena <= 96) {
      bichoSorteado = "veado";
      imagem =
        "https://thumbs.gfycat.com/AngryTenderGuineafowl-size_restricted.gif";
      emoji = ":deer:";
    } else if ((dezena >= 97 && dezena <= 99) || dezena == 00) {
      bichoSorteado = "vaca";
      imagem =
        "https://i.pinimg.com/originals/0a/35/61/0a356142c7184ae283480e277bf81dda.gif";
      emoji = ":cow:";
    }
    // Adicionar bichoSorteado ao DB se não existir:
    let bichoData;
    try {
      bichoData = await bichoModel.findOne({nome: bichoSorteado});
      if (!bichoData) {
        let novoBicho = await bichoModel.create({
          nome: bichoSorteado,
          image: imagem,
          emoji: emoji,
          totalWins: 0,
        });
        novoBicho.save();
      }
    } catch (err) {
      console.log(err);
    }
    // E atualizar o totalWins dele:
    await bichoModel.findOneAndUpdate(
      {
        nome: bichoSorteado,
      },
      {
        $inc: {
          totalWins: 1,
        },
      }
    );
    // Exibir um embed com o bicho vencedor
    const resultEmbed = new Discord.MessageEmbed()
      .setTitle("Resultado")
      .setColor("#f54272")
      .setImage(imagem)
      .addFields({
        name: `${bichoSorteado.toString().toUpperCase()}`,
        value: `${emoji} ${emoji} ${emoji}`,
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
      // Atualizar as vitórias do usuário:
      await bichoModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            wins: +1,
          },
        }
      );
      return message.reply(
        `Você acertou o bicho e ganhou ${quantia * 18} pontos.`
      );
    } else {
      // Atualizar as derrotas do usuário:
      await bichoModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            losses: +1,
          },
        }
      );
      return message.reply(
        `O bicho escolhido (${bicho}) não foi sorteado dessa vez...`
      );
    }
  },
};
