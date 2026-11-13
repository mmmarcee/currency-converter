using System.Text.Json;
using CurrencyConverter.Models;

namespace CurrencyConverter.Services;

public class CryptoService
{
    private readonly HttpClient _httpClient;

    private static readonly Dictionary<string, string> CoinMap = new()
    {
        { "bitcoin", "BTC" }, { "ethereum", "ETH" }, { "tether", "USDT" },
        { "binancecoin", "BNB" }, { "ripple", "XRP" }, { "usd-coin", "USDC" },
        { "solana", "SOL" }, { "tron", "TRX" }, { "hyperliquid", "HYPE" },
        { "zcash", "ZEC" }, { "dogecoin", "DOGE" }, { "monero", "XMR" },
        { "chainlink", "LINK" }, { "leo-token", "LEO" }, { "cardano", "ADA" },
        { "stellar", "XLM" }, { "bitcoin-cash", "BCH" }, { "near", "NEAR" },
        { "dai", "DAI" }, { "uniswap", "UNI" }
    };

    public CryptoService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("CurrencyConverterApp/1.0");
    }

    public List<CryptoCoin> GetAllCoins()
    {
        return CoinMap.Keys.Select(id => new CryptoCoin
        {
            Id = id,
            Symbol = CoinMap[id].ToLower(),
            Name = $"{char.ToUpper(id[0]) + id.Substring(1)} ({CoinMap[id]})"
        }).ToList();
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

    public async Task<List<ChartDataPoint>> GetCryptoHistoryAsync(string cryptoId, string fiatCurrency, string period)
    {
        var id = cryptoId.ToLower();
        if (!CoinMap.TryGetValue(id, out var symbol))
            throw new ArgumentException($"Монета {cryptoId} не поддерживается для графиков.");

        string pair = $"{symbol}USDT";
        var today = DateTime.UtcNow;
        int daysToFetch;

        switch (period.ToLower())
        {
            case "10y": daysToFetch = 3650; break; 
            case "1y": daysToFetch = 365; break;   
            case "1m": daysToFetch = 30; break;   
            case "1w": daysToFetch = 7; break;     
            default: daysToFetch = 30; break;
        }

        long endTime = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        long startTime = DateTimeOffset.UtcNow.AddDays(-daysToFetch).ToUnixTimeMilliseconds();

        var rawCandles = new List<(DateTime Date, decimal Price)>();
        long currentStart = startTime;

        while (currentStart < endTime)
        {
            string url = $"https://api.binance.com/api/v3/klines?symbol={pair}&interval=1d&startTime={currentStart}&endTime={endTime}&limit=1000";
            string json = await _httpClient.GetStringAsync(url);
            using var doc = JsonDocument.Parse(json);
            var arr = doc.RootElement.EnumerateArray().ToList();

            if (arr.Count == 0) break;

            foreach (var candle in arr)
            {
                long timestamp = candle[0].GetInt64();
                decimal closePrice = decimal.Parse(candle[4].GetString()!, System.Globalization.CultureInfo.InvariantCulture);
                var date = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).DateTime;
                rawCandles.Add((date, closePrice));
            }

            var lastCandleTimestamp = arr.Last()[0].GetInt64();
            currentStart = lastCandleTimestamp + (24 * 60 * 60 * 1000);
        }

        var result = new List<ChartDataPoint>();

        switch (period.ToLower())
        {
            case "10y":
                
                result = rawCandles
                    .Where(c => c.Date.Month == today.Month && c.Date.Day == today.Day)
                    .OrderBy(c => c.Date)
                    .Select(c => new ChartDataPoint { Date = c.Date.ToString("yyyy-MM-dd"), Price = Math.Round(c.Price, 2) })
                    .ToList();
                break;
            case "1y":
                
                result = rawCandles
                    .Where(c => c.Date.Day == today.Day)
                    .OrderBy(c => c.Date)
                    .Select(c => new ChartDataPoint { Date = c.Date.ToString("yyyy-MM"), Price = Math.Round(c.Price, 2) })
                    .ToList();
                break;
            case "1m":
            case "1w":
            default:
                
                result = rawCandles
                    .OrderBy(c => c.Date)
                    .Select(c => new ChartDataPoint { Date = c.Date.ToString("yyyy-MM-dd"), Price = Math.Round(c.Price, 2) })
                    .ToList();
                break;
        }

        return result;
    }
}