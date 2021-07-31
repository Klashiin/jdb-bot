using System;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;

namespace JdB_Bot
{
    class Program
    {
        static void Main(string[] args)
            => new Program().AsyncMain().GetAwaiter().GetResult();

        private static DiscordSocketClient _client;

        public async Task AsyncMain()
        {
            _client = new DiscordSocketClient();
            _client.Log += Log;
            var token = Environment.GetEnvironmentVariable("DiscordToken");
            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();
            await Task.Delay(-1);
        }

        private Task Log(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
    }
}
