using CurrencyConverter.Models;
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
    public IActionResult GetAllCoins() => Ok(_cryptoService.GetAllCoins());

    
    [HttpGet("convert")]
    public async Task<IActionResult> Convert([FromQuery] string from, [FromQuery] string to, [FromQuery] decimal amount)
    {
        if (amount <= 0) return BadRequest(new { error = "Сумма должна быть больше нуля" });

        try
        {
            decimal rate = await _cryptoService.GetCryptoPriceAsync(from, to);
            decimal finalResult = Math.Round(amount * rate, 4);

            return Ok(new { from = from.ToLower(), to = to.ToLower(), amount, result = finalResult });
        }
        catch (ArgumentException ex) { return BadRequest(new { error = ex.Message }); }
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory([FromQuery] string from, [FromQuery] string to, [FromQuery] string period = "1m")
    {
        try
        {
            var history = await _cryptoService.GetCryptoHistoryAsync(from, to, period);
            return Ok(history);
        }
        catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
    }
}