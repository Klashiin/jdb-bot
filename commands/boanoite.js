module.exports = {
    name: "boanoite",
    description: "Exibe uma mensagem de boa noite.",
    execute(client, message, args, Discord, profileData) {
        message.channel.send('Boa Noite Grupo')
    }
}