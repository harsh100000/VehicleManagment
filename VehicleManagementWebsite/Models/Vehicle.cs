using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace vechicalManagement.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string VehicleName {  get; set; }
        public string PlateNumber { get; set; }
        public DateTime? ServiceStartDate { get; set; }
        public DateTime? ServiceEndDate { get; set; }
        public string Status { get; set; }

        public string CustomerName { get; set; }
        public int WorkerId { get; set; }


    }
}
