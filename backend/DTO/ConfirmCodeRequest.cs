using System;
using System.ComponentModel.DataAnnotations;

namespace CurrencyConverter.DTOs;

public class ConfirmCodeRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Code { get; set; } = string.Empty;
}
