using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vechicalManagement.Data;
using vechicalManagement.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
namespace vechicalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext context,IConfiguration  configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existedUser =  _context.Users.FirstOrDefault(u=>u.Email==user.Email);
            
            if(existedUser!= null)
            {
                return BadRequest("Email is already exists");
            }

            // hash the user's password..


            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // add the new user to the database

            _context.Users.Add(user);

            // save changes to the database

            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully" });


        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] JsonElement requestBody)
        {
            if (!requestBody.TryGetProperty("Email", out JsonElement emailElement) ||
                !requestBody.TryGetProperty("Password", out JsonElement passwordElement))
            {
                return BadRequest("Email and Password are required");
            }

            var email = emailElement.GetString();
            var password = passwordElement.GetString();

            var existedUser = _context.Users.FirstOrDefault(u => u.Email == email);
            if (existedUser == null)
            {
                return BadRequest("User not found");
            }

            var passwordCheck = BCrypt.Net.BCrypt.Verify(password, existedUser.Password);
            if (!passwordCheck)
            {
                return BadRequest("Password is incorrect");
            }

            var token = GenerateJwtToken(existedUser);
            
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            }; 

            Response.Cookies.Append("JwtToken", token, cookieOptions);

            return Ok(new { Message = "Login successful",token, existedUser.Role});
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role ?? "serviceAdvisor"), // Ensure Role is properly set or default
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim("UserId", user.Id.ToString()),
            

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



    }
}
