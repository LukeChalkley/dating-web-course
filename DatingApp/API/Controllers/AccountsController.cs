using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController(context)
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterUserDto registerUserDto)
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
        
        return userToRegister.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(UserLoginDto userLoginDto)
    {
        // IMPORTANT: We cannot use FindAsync because Email is NOT the PK.
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email.ToLower() == userLoginDto.Email.ToLower());
        
        if (user == null) return BadRequest("The email address or password provided is incorrect.");
        
        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLoginDto.Password));

        if (computedHash.SequenceEqual(user.PasswordHash)) return user.ToDto(tokenService);
        else return BadRequest("The email address or password provided is incorrect.");
    }
    
    private async Task<bool> UserExists(string email)
    {
        // IMPORTANT: We cannot use FindAsync because Email is NOT the PK.
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}