using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vechicalManagement.Data;
using vechicalManagement.Models;

namespace vechicalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InvoiceController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("invoice")]
        public async Task<IActionResult> invoice(int vehicleId, [FromBody] ServiceRecord records )
        {
            var workItemUsedInVehicle = _context.WorkItems.
                FirstOrDefault(u => u.VehicleId == vehicleId);
           
            records.VehicleId = vehicleId;
            
            records.Price = workItemUsedInVehicle.Cost;
            records.WorkItemId = workItemUsedInVehicle.Id;


            _context.serviceRecords.Add(records);
            await _context.SaveChangesAsync();
            

            return Ok();
        }
      

        }
}

