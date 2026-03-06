using API.DTO;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        UserDto dto = new UserDto
        {
            Email = user.Email,
            Id = user.Id,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)
        };
        
        return dto;
    }
}