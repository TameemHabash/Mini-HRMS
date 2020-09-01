using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace API_HRMS.Models
{
    public class Sector
    {
        [Key]
        public int _ID { get; set; }
        public string _name{ get; set; }
        public int _departmentID { get; set; }
        public string? _description { get; set; }
    }
}
