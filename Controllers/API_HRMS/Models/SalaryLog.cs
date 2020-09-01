using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_HRMS.Models
{
    public class SalaryLog
    {
        [Key]
        public int _logID { get; set; }
        public int _salaryID { get; set; }
        public double value { get; set; }
        public DateTime _logDate { get; set; }
        public double? bonus { get; set; }
    }
}
