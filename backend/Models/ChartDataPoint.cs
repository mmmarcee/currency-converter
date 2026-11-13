using System;

namespace CurrencyConverter.Models;

public class ChartDataPoint
{
    public string Date { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
