using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController(AppDbContext context) : BaseApiController(context)
{
    [HttpGet("bad-auth")]
    public IActionResult BadAuth()
    {
        return Unauthorized();
    }
    
    [HttpGet("not-found")]
    public IActionResult NotFound()
    {
        return NotFound();
    }
    
    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("Server error");
    }
    
    [HttpGet("bad-request")]
    public IActionResult BadRequest()
    {
        throw new Exception("Bad request..");
    }
}