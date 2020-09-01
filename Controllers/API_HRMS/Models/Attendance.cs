using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoFixture;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Timers;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_HRMS.Models
{
    public class Attendance
    {

        [Key]
        public int attendanceID { get; set; }
        public int employeeID { get; set; }
        public DateTime entry { get; set; }
        public DateTime leave { get; set; }
        public DateTime attendanceDate { get; set; }
        public TimeSpan dailyHours { get; set; }

     
    }
}
