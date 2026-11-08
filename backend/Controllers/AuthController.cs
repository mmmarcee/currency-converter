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
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null) return BadRequest(new { error = "Пользователь уже существует" });

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded) return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

       
        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

       
        long myTestChatId = 1830005021; 
        await _telegramService.SendMessageAsync(myTestChatId, $"Ваш код для входа: {code}");

        return Ok(new { message = "Регистрация успешна. Проверьте Telegram!" });
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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return Unauthorized(new { error = "Неверный email или пароль" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            if (result.IsNotAllowed)
                return Unauthorized(new { error = "Аккаунт не подтвержден. Проверьте Telegram." }); 

            return Unauthorized(new { error = "Неверный email или пароль" });
        }

        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Email = user.Email!,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        });
    }
}