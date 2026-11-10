using Microsoft.AspNetCore.Identity;

namespace CurrencyConverter.Models;

public class ApplicationUser : IdentityUser
{
    public long? TelegramChatId { get; set; }
    public string? TelegramConfirmationToken { get; set; } 
    public DateTime? TelegramTokenExpiresAt { get; set; }
}