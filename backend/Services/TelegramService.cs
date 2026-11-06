using System;
using Telegram.Bot;

namespace CurrencyConverter.Services;

public class TelegramService
{
    private readonly TelegramBotClient _botClient;

    public TelegramService(IConfiguration configuration)
    {
        var token = configuration["Telegram:BotToken"];
        _botClient = new TelegramBotClient(token!);
    }

    public async Task SendMessageAsync(long chatId, string message)
    {
        await _botClient.SendMessage(chatId: chatId, text: message);
    }
}
