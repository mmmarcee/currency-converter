using System.Text.Json;

namespace CurrencyConverter.Services;

public class CryptoService
{
    private readonly HttpClient _httpClient;

    public CryptoService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("CurrencyConverterApp/1.0");
    }

    public async Task<decimal> GetCryptoPriceAsync(string cryptoId, string fiatCurrency)
    {
        var id = cryptoId.ToLower();
        var fiat = fiatCurrency.ToLower();

        string url = $"https://api.coingecko.com/api/v3/simple/price?ids={id}&vs_currencies={fiat}";
        string json = await _httpClient.GetStringAsync(url);

        var data = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, decimal>>>(json);

        if (data == null || !data.ContainsKey(id) || !data[id].ContainsKey(fiat))
        {
            throw new ArgumentException($"Не удалось получить курс {cryptoId} к {fiatCurrency}");
        }

        return data[id][fiat];
    }
}
