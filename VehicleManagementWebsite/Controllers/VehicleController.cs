using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using vechicalManagement.Data;
using vechicalManagement.Models;

namespace vechicalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VehicleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehicleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("addVehicle")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddVehicle([FromBody] Vehicle vehicle)
        {
            if (vehicle == null)
            {
                return BadRequest("Invalid vehicle data.");
            }

            try
            {
                // Check if the vehicle already exists
                var existingVehicle = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.PlateNumber == vehicle.PlateNumber);

                if (existingVehicle != null)
                {
                    return BadRequest("Vehicle already exists.");
                }

                await _context.Vehicles.AddAsync(vehicle);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Vehicle added successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework here)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpDelete("deleteVehicle")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteVehicle([FromQuery] int id)
        {
            try
            {
                var existingVehicle = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.Id == id);

                if (existingVehicle == null)
                {
                    return NotFound("Vehicle not found.");
                }

                _context.Vehicles.Remove(existingVehicle);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Vehicle deleted successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework here)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("updateVehicle")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] Vehicle vehicle)
        {
            if (vehicle == null || vehicle.Id != id)
            {
                return BadRequest("Invalid vehicle data.");
            }

            try
            {
                var existingVehicle = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.Id == id);

                if (existingVehicle == null)
                {
                    return NotFound("Vehicle not found.");
                }

                // Update vehicle details
                existingVehicle.Status = vehicle.Status;
                existingVehicle.PlateNumber = vehicle.PlateNumber;
                existingVehicle.ServiceEndDate = vehicle.ServiceEndDate;
                existingVehicle.VehicleName = vehicle.VehicleName;
                existingVehicle.ServiceStartDate = vehicle.ServiceStartDate;
                existingVehicle.CustomerName = vehicle.CustomerName;
                existingVehicle.WorkerId = vehicle.WorkerId;

                _context.Vehicles.Update(existingVehicle);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Vehicle updated successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework here)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpGet("allVehicle")]
        public async Task<IActionResult> GetVehicles()
        {
            try
            {
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                var userId = User.FindFirst("UserId")?.Value;

                if (string.IsNullOrEmpty(userRole) || string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User role or ID not found in the token.");
                }

                if (userRole == "admin")
                {
                    var vehicles = await _context.Vehicles.ToListAsync();
                    return Ok(vehicles);
                }
                else if (userRole == "serviceAdvisor")
                {
                    var vehicles = await _context.Vehicles
                        .Where(v => v.WorkerId.ToString() == userId)
                        .ToListAsync();
                    return Ok(vehicles);
                }
                else
                {
                    return Forbid("User does not have the required role.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework here)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred: {ex.Message}" });
            }
        }
        [HttpGet("getVehicleById")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> getVehicleId([FromQuery] int id)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(u => u.Id == id);
            if(vehicle == null)
            {
                return BadRequest("not fetching");
            }

            return Ok(vehicle);
        }

    }
}
