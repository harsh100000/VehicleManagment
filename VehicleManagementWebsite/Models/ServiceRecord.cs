using System.ComponentModel.DataAnnotations.Schema;

namespace vechicalManagement.Models
{
    public class ServiceRecord
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }

        public DateTime ServiceDate { get; set; }

        public int WorkItemId { get; set; }         
        public int Price { get; set; }





    }
}
