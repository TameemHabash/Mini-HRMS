using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace API_HRMS.Models
{
    public class Absence
    {
        [Key]
        public int absenceID { get; set; }
        public int employeeID { get; set; }
        public string? absenceDescription { get; set; }
        public DateTime absenceDate { get; set; }
        public bool? excuse { get; set; }

    }
}
