module.exports = {
    name: "boanoite",
    description: "Exibe uma mensagem de boa noite.",
    execute(client, message, args) {
        message.channel.send('Boa Noite Grupo')
    }
}