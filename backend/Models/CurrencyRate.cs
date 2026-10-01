namespace CurrencyConverter.Models;

public class CurrencyRate
{
    public string CharCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
}