using System;

namespace JdB_Bot
{
    class Program
    {
        static void Main(string[] args)
            => new Program().AsyncMain().GetAwaiter().GetResult();

        public async Task AsyncMain()
        {
        }
    }
}
