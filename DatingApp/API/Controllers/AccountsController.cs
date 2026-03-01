using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController(context)
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterUserDto registerUserDto)
    {
        if (await this.UserExists(registerUserDto.Email)) 
            return BadRequest("User with the given e-mail address is already registered.");
        
        using var hmac = new HMACSHA512();
        
        // Remember: ID is automatically set within AppUser class.
        var userToRegister = new AppUser
        {
            DisplayName = registerUserDto.DisplayName,
            Email = registerUserDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUserDto.Password)),
            PasswordSalt = hmac.Key
        };
        
        await context.Users.AddAsync(userToRegister);
        await context.SaveChangesAsync();
        
        return userToRegister;
    }

    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}