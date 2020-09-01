using API_HRMS.Models;
using API_HRMS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API_HRMS.Data
{
    public class SqlEmployeeRepo : IEmployeeRepo
    {
        private readonly EmpContext _context;
        public Employee employeesList;
        public EmployeesController EmployeesController;

        public SqlEmployeeRepo(EmpContext context)
        {
            _context = context;

        }
        public IEnumerable<Employee> Get()
        {
            return _context.Employees.AsNoTracking().ToList();
        }

        public Employee Get(int ID)
        {
            var id = _context.Employees.AsNoTracking().FirstOrDefault(p => p._ID == ID);
            _context.SaveChanges();
            return (id);

        }
        public ActionResult<Employee> Post(Employee employees)
        {
            _context.Employees.Add(employees);
            _context.SaveChanges();
            return CreatedAtActionResult(nameof(Get), new { id = employees._ID }, employees);
        }
        public ActionResult<Employee> Put(int id, Employee employees)
        {
            _context.Entry(employees).State = EntityState.Modified;
            _context.SaveChanges();
            return null;


        }
        public ActionResult<Employee> Delete(int id)
        {
            var deletedEmployee = _context.Employees.Find(id);
            _context.Employees.Remove(deletedEmployee);
            _context.SaveChanges();
            return employeesList;
        }


        private ActionResult<Employee> CreatedAtActionResult(string v, object p, Employee employees)
        {
            return null;
        }


    }
}
