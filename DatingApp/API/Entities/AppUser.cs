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
    
    /// <summary>
    /// Simple one-way encryption from plaintext password to hash.
    /// </summary>
    public required byte[] PasswordHash { get; set; }
    
    /// <summary>
    /// Allows randomisation of PasswordHash so same passwords don't equate to the same hash.
    /// </summary>
    public required byte[] PasswordSalt { get; set; }
}