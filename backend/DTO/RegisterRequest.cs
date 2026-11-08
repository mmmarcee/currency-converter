using System.ComponentModel.DataAnnotations;

namespace CurrencyConverter.DTOs;

public class RegisterRequest
{
    [Required(ErrorMessage = "Логин обязателен")]
    [MinLength(3, ErrorMessage = "Логин должен быть не менее 3 символов")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Пароль обязателен")]
    [MinLength(6, ErrorMessage = "Пароль должен быть минимум 6 символов")]
    public string Password { get; set; } = string.Empty;
}