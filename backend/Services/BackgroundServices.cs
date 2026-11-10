using Telegram.Bot;
using Telegram.Bot.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using CurrencyConverter.Models;
using Microsoft.AspNetCore.Identity;

namespace CurrencyConverter.Services;


public class TelegramBotBackgroundService : BackgroundService
{
    private readonly TelegramBotClient _botClient;
    
    private readonly IServiceScopeFactory _scopeFactory;

    public TelegramBotBackgroundService(IConfiguration configuration, IServiceScopeFactory scopeFactory)
    {
        var token = configuration["Telegram:BotToken"];
        _botClient = new TelegramBotClient(token!);
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        
        _botClient.StartReceiving(
            updateHandler: HandleUpdateAsync,
            errorHandler: HandlePollingErrorAsync,
            receiverOptions: new ReceiverOptions { AllowedUpdates = Array.Empty<UpdateType>() },
            cancellationToken: stoppingToken
        );

        Console.WriteLine(" Telegram Bot started receiving messages...");

        // Держим сервис запущенным
        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    private async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
    {

        if (update.Type != UpdateType.Message || update.Message?.Text == null) return;

        var message = update.Message;
        var text = message.Text;

        
        if (text.StartsWith("/start "))
        {
            var token = text.Substring(7).Trim(); 

           
            using var scope = _scopeFactory.CreateScope();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            
            var user = userManager.Users.FirstOrDefault(u => u.TelegramConfirmationToken == token);

            if (user != null && user.TelegramTokenExpiresAt > DateTime.UtcNow)
            {
                // Все отлично! Подтверждаем аккаунт
                user.TelegramChatId = message.Chat.Id; 
                user.EmailConfirmed = true; 
                user.TelegramConfirmationToken = null; 
                user.TelegramTokenExpiresAt = null;

                await userManager.UpdateAsync(user);

                await botClient.SendMessage(message.Chat.Id, " Отлично! Ваш аккаунт успешно подтверждён. Возвращайтесь на сайт!");
            }
            else
            {
                await botClient.SendMessage(message.Chat.Id, " Ссылка недействительна или устарела. Запросите новую на сайте.");
            }
        }
        else if (text == "/start")
        {
            
            await botClient.SendMessage(message.Chat.Id, "Привет! Я бот для подтверждения аккаунтов. Пожалуйста, перейдите по ссылке с сайта.");
        }
    }

    private Task HandlePollingErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
    {
        Console.WriteLine($"Telegram Bot Error: {exception.Message}");
        return Task.CompletedTask;
    }
}