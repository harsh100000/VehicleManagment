using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vechicalManagement.Data;
using vechicalManagement.Models;

namespace vechicalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WorkItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("addWorkItem")]
        public async Task<IActionResult> AddWorkItem([FromQuery] int vehicleId, [FromBody] WorkItem item)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
            {
                return NotFound("Vehicle not found.");
            }

            item.VehicleId = vehicleId;

            // Log the items list
            if (item.Items != null && item.Items.Any())
            {
                Console.WriteLine("Items:");
                foreach (var i in item.Items)
                {
                    Console.WriteLine($"- {i}");
                }
            }
            else
            {
                Console.WriteLine("No items found.");
            }

            _context.WorkItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Work item added successfully." });
        }

        [HttpGet("getWorkItembyId")]

        public async Task<IActionResult> getWorkItemById([FromQuery] int id)
        {
            var item = _context.WorkItems.FirstOrDefault(u => u.Id == id);
            if(item == null)
            {
                return NotFound();
            }
            return Ok(item);

        }
    }
}
