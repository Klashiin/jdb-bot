using System;
using System.Linq;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;

namespace JdB_Bot
{
    class Program
    {
        // Reescrevendo Main() para AsyncMain():
        static void Main(string[] args)
            => new Program().AsyncMain().GetAwaiter().GetResult();

        private static DiscordSocketClient _client;
        private static CommandService _command;

        public async Task AsyncMain()
        {
            // Objetos:
            _client = new DiscordSocketClient();
            _command = new CommandService();
            // Conectando eventos de Log à task de Log
            _client.Log += Log;
            _command.Log += Log;
            // Fazer a conexão assíncrona de _client:
            var token = Environment.GetEnvironmentVariable("DiscordToken");
            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();
            await Task.Delay(-1);
        }

        private Task Log(LogMessage msg)
        {
            if (msg.Exception is CommandException cmdException)
            {
                Console.WriteLine($"[Command/{msg.Severity}] {cmdException.Command.Aliases.First()}"
                + $" failed to execute in {cmdException.Context.Channel}.");
                Console.WriteLine(cmdException);
            }
            else 
            {
                Console.WriteLine($"[General/{msg.Severity}] {msg}");
            }
            return Task.CompletedTask;
        }
    }
}
