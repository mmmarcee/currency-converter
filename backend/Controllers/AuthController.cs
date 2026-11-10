using CurrencyConverter.DTOs;
using CurrencyConverter.Models;
using CurrencyConverter.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyConverter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly TelegramService _telegramService;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        TokenService tokenService,
        TelegramService telegramService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _telegramService = telegramService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (request.Username.Length < 3)
        {
            return BadRequest(new
            {
                message = "Логин должен содержать минимум 3 символа"
            });
        }

        if (request.Password.Length < 6)
        {
            return BadRequest(new
            {      
                message = "Пароль должен содержать минимум 6 символов"
            });
        }

        
        var existingUser = await _userManager.FindByNameAsync(request.Username);
        if (existingUser != null)
        {
            return BadRequest(new
            {
          
                message = "Логин уже занят"
            });
        }

        var user = new ApplicationUser
        {
            UserName = request.Username,
            Email = $"{request.Username}@local.com"
        };

        
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                message = "Пароль не соответствует требованиям",
                details = result.Errors.Select(e => new { code = e.Code, description = e.Description })
            });
        }

        return Ok(new { message = "Регистрация успешна. Подтвердите аккаунт через Telegram." });
    }



    [HttpPost("confirm-code")]
    public async Task<IActionResult> ConfirmCode([FromBody] ConfirmCodeRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null) return NotFound(new { error = "Пользователь не найден" });


        var result = await _userManager.ConfirmEmailAsync(user, request.Code);

        if (!result.Succeeded)
            return BadRequest(new { error = "Неверный код подтверждения" });

        return Ok(new { message = "Аккаунт успешно подтвержден! Теперь вы можете войти." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

       
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user == null)
            return Unauthorized(new { error = "Неверный логин или пароль" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            if (result.IsNotAllowed)
                return Unauthorized(new { error = "Аккаунт не подтвержден. Проверьте Telegram." });

            return Unauthorized(new { error = "Неверный логин или пароль" });
        }

        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Email = user.UserName!, 
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        });
    }
    [HttpPost("telegram-link")]
    public async Task<IActionResult> GenerateTelegramLink([FromBody] TelegramLinkRequest request)
    {
       
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user == null) return NotFound(new { error = "Пользователь не найден" });

        var token = Guid.NewGuid().ToString("N").Substring(0, 16);

        user.TelegramConfirmationToken = token;
        user.TelegramTokenExpiresAt = DateTime.UtcNow.AddMinutes(15);
        await _userManager.UpdateAsync(user);


        var botUsername = "fiatfluxbot";
        var deepLink = $"https://t.me/{botUsername}?start={token}";

        return Ok(new { url = deepLink });
    }
}
