using Microsoft.AspNetCore.Identity.UI.Services;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CurrencyConverter.Services;

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var apiKey = _configuration["SendGrid:ApiKey"];
        var fromEmail = _configuration["SendGrid:FromEmail"];
        var fromName = _configuration["SendGrid:FromName"];

        Console.WriteLine("=== EmailSender ===");
        Console.WriteLine($"API KEY exists: {!string.IsNullOrEmpty(apiKey)}");
        Console.WriteLine($"FROM: {fromEmail}");
        Console.WriteLine($"TO: {email}");
        Console.WriteLine($"SUBJECT: {subject}");

        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(fromEmail, fromName);
        var to = new EmailAddress(email);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlMessage);

        var response = await client.SendEmailAsync(msg);

        Console.WriteLine($"SendGrid Response: {(int)response.StatusCode} {response.StatusCode}");
        var body = await response.Body.ReadAsStringAsync();
        Console.WriteLine($"SendGrid Body: {body}");
        Console.WriteLine("=== /EmailSender ===");
    }
}