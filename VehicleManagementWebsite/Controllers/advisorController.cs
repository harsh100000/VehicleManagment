using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vechicalManagement.Data;

namespace vechicalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class advisorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public advisorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getAdvisor")]

        public async Task<IActionResult> getAdvisor()
        {
            try
            {
                var advisorList = await _context.Users.Where(u => u.Role == "serviceAdvisor").ToListAsync();
                if(advisorList.Count == 0)
                {
                    return NotFound();
                }
                return Ok(advisorList);

            }
            catch
            {
                return BadRequest("Error in fetching advisor List");
            }

        }

        [HttpGet("getAdvisorById")]

        public async Task<IActionResult> getAdvisorById([FromQuery] int id)
        {
                var advsior =  _context.Users.FirstOrDefault(u => u.Id == id);
            if (advsior == null) {

                return BadRequest("Advisor is not found");
            }

            return Ok(advsior);
        }

    }
}
