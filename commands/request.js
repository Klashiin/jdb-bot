module.exports = {
  name: "request",
  description:
    "~request [@usuário] [quantia] : solicita um pagamento da quantia especificada ao @usuário.",
  execute: function (client, message, args, Discord, profileData) {
    // Definindo os argumentos:
    const quantia = args[1];
    const target = message.mentions.users.first();
    // Checagens dos argumentos passados:
    if (!args.length)
      return message.reply(
        "Você precisa marcar um usuário para usar esse comando!"
      );
    if (!target) return message.reply("Esse usuário não existe.");
    if (quantia % 1 != 0 || quantia <= 0)
      return message.reply(
        "A quantia a ser paga tem que ser um número inteiro positivo."
      );
    // Array de imagens aleatórias
    imagens = [
      "https://c.tenor.com/qwgpp1tmT6EAAAAC/squidward-spare.gif",
      "https://c.tenor.com/lgeFoHdYtPoAAAAM/bernie-sanders-i-am-once-again-asking-for-your-financial-support.gif",
      "https://c.tenor.com/YdYKoeIP9OkAAAAM/ok-money-rain.gif",
      "https://c.tenor.com/9Vr9gIf4IdoAAAAM/good-luck-charlie-money-please.gif",
      "https://68.media.tumblr.com/2796390bd2bb10b209eac2db765cc40d/tumblr_nzar7aMRZE1unwageo1_250.gif",
    ];
    imagem = imagens[Math.floor(Math.random() * ((imagens.length-1) - 0 + 1)) + 0];
    // Fazer o embed bonitinho:
    const requestEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.member.user.tag}`)
      .setTitle("Pagamento Solicitado")
      .addFields({
        name: `${quantia} pontos`,
        value: `<@${target.id}>, pague <@${message.author.id}>!`,
      })
      .setColor("#118C4F")
      .setImage(imagem);
    message.channel.send(requestEmbed);
  },
};
