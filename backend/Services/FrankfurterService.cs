using System.Text.Json;
using CurrencyConverter.Models;

namespace CurrencyConverter.Services;

public class FrankfurterService
{
    private readonly HttpClient _httpClient;

    private static readonly Dictionary<string, string> CurrencyNames = new()
    {
        { "USD", "Доллар США" },
        { "EUR", "Евро" },
        { "RUB", "Российский рубль" },
    
    };

    public FrankfurterService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }




    public async Task<CurrencyRate> GetRateAsync(string charCode)
    {
        var code = charCode.ToUpper();

        if (code == "RUB")
        {
            return new CurrencyRate
            {
                CharCode = "RUB",
                Name = "Российский рубль",
                Value = 1m
            };
        }

        string url = $"https://api.frankfurter.dev/v2/rate/{code.ToLower()}/rub";
        string json = await _httpClient.GetStringAsync(url);

        var data = JsonSerializer.Deserialize<FrankfurterRate>(json);

        if (data == null)
        {
            throw new ArgumentException($"Не удалось получить курс для {code}");
        }

        return new CurrencyRate
        {
            CharCode = code,
            Name = CurrencyNames.TryGetValue(code, out var name) ? name : code,
            Value = data.Rate
        };
    }

    



    public async Task<decimal> ConvertAsync(string from, string to, decimal amount)
    {
        var fromCode = from.ToUpper();
        var toCode = to.ToUpper();

        if (fromCode == toCode)
        {
            return amount;
        }

        string url = $"https://api.frankfurter.dev/v2/rate/{fromCode.ToLower()}/{toCode.ToLower()}";
        string json = await _httpClient.GetStringAsync(url);

        var data = JsonSerializer.Deserialize<FrankfurterRate>(json);

        if (data == null)
        {
            throw new ArgumentException($"Не удалось получить курс {fromCode} → {toCode}");
        }

        return Math.Round(amount * data.Rate, 4);
    }

    


    public async Task<List<FrankfurterRate>> GetHistoryAsync(string from, string to, string period)
    {
        var fromCode = from.ToUpper();
        var toCode = to.ToUpper();

        DateTime endDate = DateTime.UtcNow;
        DateTime startDate;
        string group;

        switch (period.ToLower())
        {
            case "10y":
                startDate = endDate.AddYears(-10);
                group = "year";
                break;
            case "1y":
                startDate = endDate.AddYears(-1);
                group = "month";
                break;
            case "1m":
                startDate = endDate.AddMonths(-1);
                group = "";
                break;
            case "1w":
                startDate = endDate.AddDays(-7);
                group = "";
                break;
            default:
                startDate = endDate.AddMonths(-1);
                group = "";
                break;
        }

        string start = startDate.ToString("yyyy-MM-dd");
        string end = endDate.ToString("yyyy-MM-dd");

        string url = $"https://api.frankfurter.dev/v2/rates?from={start}&to={end}" +
                     $"&base={fromCode.ToLower()}&quotes={toCode.ToLower()}";

        if (!string.IsNullOrEmpty(group))
        {
            url += $"&group={group}";
        }

        string json = await _httpClient.GetStringAsync(url);

        var data = JsonSerializer.Deserialize<List<FrankfurterRate>>(json);

        if (data == null)
        {
            throw new ArgumentException($"Не удалось получить историю {fromCode}/{toCode}");
        }

        return data;
    }
}