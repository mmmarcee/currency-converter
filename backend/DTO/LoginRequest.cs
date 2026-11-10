using System.ComponentModel.DataAnnotations;

namespace CurrencyConverter.DTOs;

public class LoginRequest
{
    [Required(ErrorMessage = "Логин обязателен")]
    public string Username { get; set; } = string.Empty; 

    [Required(ErrorMessage = "Пароль обязателен")]
    public string Password { get; set; } = string.Empty;
}