using API_HRMS.Data;
using API_HRMS.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_HRMS.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepo _context;
        public Employee EmpData { get; set; }
        public EmployeesController(EmpContext dbContext)
        {
            _context = new SqlEmployeeRepo(dbContext);            
            var GetEmployee = _context.Get();            
        }

        // GET: api/Employees
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            var employeesElements = _context.Get();
            return Ok(employeesElements);
        }

        // GET: api/Employees/{id}
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(int id)
        {
            var employeesElement = _context.Get(id);
            return Ok(employeesElement);
        }

        //POST : api/Employees
        [HttpPost]
        public ActionResult<Employee> Post([FromBody] Employee employees)
        {
            var postElement = _context.Post(employees);
            return Ok(employees);

        }

        //PUT  : api/Employees/{id}
        [HttpPut("{id}")]
        public ActionResult<Employee> Put(int id, [FromBody]Employee employees)
        {
            if (id != employees._ID)
            {
                return BadRequest("Wrong ID !");
            }
                var updatedEmployee = _context.Get(id);
            
            if(updatedEmployee == null)
            {
                return NotFound($"Employee with ID + {id} + Not Found");
            }
            return _context.Put(id,employees);
        }

        //DELETE : api/employees/{id}
        [HttpDelete("{id}")]
        public ActionResult<Employee> Delete(int id)
        {
            var deleteItem = _context.Delete(id);
            if (deleteItem == null)
            {
                return NotFound();
            }
            return deleteItem;
        }
    }
}
