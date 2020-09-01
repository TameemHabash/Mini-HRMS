using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_HRMS.Models
{
    public class Department
    {
        [Key]
        public int _ID { get; set; }
        public string _name { get; set; }
        public string? _description { get; set; }
        public int managerID { get; set; }
    }
}
