using System;
using Discord;
using Discord.WebSocket;
using System.Threading.Tasks;

namespace JdB_Bot
{
    class Program
    {
        static void Main(string[] args)
            => new Program().AsyncMain().GetAwaiter().GetResult();

        private DiscordSocketClient DSClient;

        public async Task AsyncMain()
        {
            DSClient = new DiscordSocketClient();
            DSClient.Log += Log;

            var token = Environment.GetEnvironmentVariable("DiscordToken");

            await DSClient.LoginAsync(TokenType.Bot, token);
            await DSClient.StartAsync();

            await Task.Delay(-1);
        }

        private Task Log(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
    }
}
