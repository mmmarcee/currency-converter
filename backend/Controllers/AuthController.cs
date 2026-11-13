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

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var existingUser = await _userManager.FindByNameAsync(request.Username);
        if (existingUser != null)
            return BadRequest(new { code = "USERNAME_TAKEN", message = "Логин уже занят" });

        var user = new ApplicationUser
        {
            UserName = request.Username,
            Email = $"{request.Username}@local.com"
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            return BadRequest(new { code = "VALIDATION_ERROR", errors = result.Errors.Select(e => e.Description) });

        return Ok(new { message = "Регистрация успешна! Теперь вы можете войти." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.FindByNameAsync(request.Username);
        if (user == null)
            return Unauthorized(new { code = "INVALID_CREDENTIALS", message = "Неверный логин или пароль" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
            return Unauthorized(new { code = "INVALID_CREDENTIALS", message = "Неверный логин или пароль" });

        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Email = user.UserName!, 
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        });
    }
}