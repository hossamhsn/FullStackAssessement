using FullStack.Assessment.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FullStack.Assessment.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Employee> Employees { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
               .HasData(
               new Employee()
               {
                   Id = 1,
                   Name = "Test Emp1",
                   Department = "department1",
                   DateOfJoining = System.DateTime.Now
               },
                new Employee()
                {
                    Id = 2,
                    Name = "Test Emp2",
                    Department = "department2",
                    DateOfJoining = System.DateTime.Now
                } );
            base.OnModelCreating(modelBuilder);
        }
        }
    }
