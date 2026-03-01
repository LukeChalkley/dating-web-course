using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AppUsersController(AppDbContext context) : BaseApiController(context)
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetAllMembers()
    {
        return await context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetById(string id)
    {
        var user = await context.Users.FindAsync(id);
        
        if (user == null) return NotFound();
        return user;
    }
}