using Microsoft.AspNetCore.Mvc;
using CurrencyConverter.Services;

namespace CurrencyConverter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CurrencyController : ControllerBase
{
    private readonly FrankfurterService _currencyService;

    public CurrencyController(FrankfurterService currencyService)
    {
        _currencyService = currencyService;
    }

   

    [HttpGet("usd")]
    public Task<IActionResult> GetUsd() => GetCurrency("USD");

   

    [HttpGet("eur")]
    public Task<IActionResult> GetEur() => GetCurrency("EUR");

   

    [HttpGet("rub")]
    public Task<IActionResult> GetRub() => GetCurrency("RUB");

   

    [HttpGet("convert")]
    public async Task<IActionResult> Convert(
        [FromQuery] string from,
        [FromQuery] string to,
        [FromQuery] decimal amount)
    {
        if (amount <= 0)
        {
            return BadRequest(new { error = "Сумма должна быть больше нуля" });
        }

        try
        {
            var result = await _currencyService.ConvertAsync(from, to, amount);
            return Ok(new
            {
                from = from.ToUpper(),
                to = to.ToUpper(),
                amount,
                result
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

   

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory(
        [FromQuery] string from,
        [FromQuery] string to,
        [FromQuery] string period = "1m")
    {
        try
        {
            var history = await _currencyService.GetHistoryAsync(from, to, period);
            return Ok(history);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

   

    private async Task<IActionResult> GetCurrency(string charCode)
    {
        try
        {
            var rate = await _currencyService.GetRateAsync(charCode);
            return Ok(new
            {
                rate.CharCode,
                rate.Name,
                rate.Value
            });
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }
}