using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using vechicalManagement.Models;

namespace vechicalManagement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users {  get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<ServiceRecord> serviceRecords { get; set; }
        public DbSet<WorkItem> WorkItems { get; set; }

    }
}