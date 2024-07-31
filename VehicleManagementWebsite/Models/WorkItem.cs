using System.ComponentModel.DataAnnotations.Schema;

namespace vechicalManagement.Models
{
    public class WorkItem
    {
        public int Id { get; set; }


        public int Cost { get; set; }
        public int VehicleId { get; set; }
        
        
        
        

        public List<string> Items { get; set; }
    }
}
