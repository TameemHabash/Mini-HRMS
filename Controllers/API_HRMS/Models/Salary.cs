using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_HRMS.Models
{
    public class Salary
    {
        [Key]
        public int _salaryID { get; set; }
        public int employeeID { get; set; }
        public double? amount { get; set; }
        public int bonus { get; set; }
        


    }
}
