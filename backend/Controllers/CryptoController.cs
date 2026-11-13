using CurrencyConverter.Services;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyConverter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CryptoController : ControllerBase
{
    private readonly CryptoService _cryptoService;

    public CryptoController(CryptoService cryptoService)
    {
        _cryptoService = cryptoService;
    }

    [HttpGet("list")]
    public IActionResult GetAllCoins()
    {
        var coins = new List<object>
        {
            new { id = "bitcoin", symbol = "btc", name = "Bitcoin (BTC)" },
            new { id = "ethereum", symbol = "eth", name = "Ethereum (ETH)" },
            new { id = "tether", symbol = "usdt", name = "Tether (USDT)" },
            new { id = "binancecoin", symbol = "bnb", name = "BNB (BNB)" },
            new { id = "ripple", symbol = "xrp", name = "XRP (XRP)" },
            new { id = "usd-coin", symbol = "usdc", name = "USD Coin (USDC)" },
            new { id = "solana", symbol = "sol", name = "Solana (SOL)" },
            new { id = "tron", symbol = "trx", name = "TRON (TRX)" },
            new { id = "hyperliquid", symbol = "hype", name = "Hyperliquid (HYPE)" },
            new { id = "zcash", symbol = "zec", name = "Zcash (ZEC)" },
            new { id = "dogecoin", symbol = "doge", name = "Dogecoin (DOGE)" },
            new { id = "monero", symbol = "xmr", name = "Monero (XMR)" },
            new { id = "chainlink", symbol = "link", name = "Chainlink (LINK)" },
            new { id = "leo-token", symbol = "leo", name = "LEO Token (LEO)" },
            new { id = "cardano", symbol = "ada", name = "Cardano (ADA)" },
            new { id = "stellar", symbol = "xlm", name = "Stellar (XLM)" },
            new { id = "bitcoin-cash", symbol = "bch", name = "Bitcoin Cash (BCH)" },
            new { id = "near", symbol = "near", name = "NEAR Protocol (NEAR)" },
            new { id = "dai", symbol = "dai", name = "DAI (DAI)" },
            new { id = "uniswap", symbol = "uni", name = "Uniswap (UNI)" }
        };

        return Ok(coins);
    }

    [HttpGet("convert")]
    public async Task<IActionResult> Convert(
        [FromQuery] string from,
        [FromQuery] string to,
        [FromQuery] decimal amount)
    {
        if (amount <= 0)
            return BadRequest(new { error = "Сумма должна быть больше нуля" });

        try
        {
            decimal rate = await _cryptoService.GetCryptoPriceAsync(from, to);
            decimal finalResult = Math.Round(amount * rate, 4);

            return Ok(new
            {
                from = from.ToLower(),
                to = to.ToLower(),
                amount,
                result = finalResult
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}