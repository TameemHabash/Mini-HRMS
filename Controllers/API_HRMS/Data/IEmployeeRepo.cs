using API_HRMS.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API_HRMS.Data
{
    public interface IEmployeeRepo
    {
        
        IEnumerable<Employee> Get();
        Employee Get(int ID);
        ActionResult<Employee> Post(Employee employees);
        public ActionResult<Employee> Put(int id, [FromBody]Employee employees);
        public ActionResult<Employee> Delete(int id);

    }
}
