using API_HRMS.Models;
using Microsoft.EntityFrameworkCore;

namespace API_HRMS.Data
{
    public class EmpContext : DbContext
    {
        public EmpContext(DbContextOptions<EmpContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<SalaryLog> SalaryLog { get; set; }

        public DbSet<Attendance> Attendance { get; set; }
        public DbSet <Absence> Absence { get; set; }
        public DbSet <HRUser> HRUser { get; set; }
        public DbSet <Department> Department { get; set; }
        public DbSet <Sector> Sector { get; set; }

    }
}
