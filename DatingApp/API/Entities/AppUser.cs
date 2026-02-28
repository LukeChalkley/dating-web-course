namespace API.Entities;

public class AppUser
{
    /// <summary>
    /// Gets the ID of the AppUser.
    /// This is set to a string representation of a Guid when AppUser is instantiated.
    /// </summary>
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    /// <summary>
    /// Gets or sets the display name of the AppUser instance.
    /// </summary>
    public required string DisplayName { get; set; }
    
    /// <summary>
    /// Gets or sets e-mail of the AppUser instance.
    /// </summary>
    public required string Email { get; set; }
}