using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace API_HRMS.Models
{
    public class Employee
    {
        [Key]
        public int _ID { get; set; }
        public string name { get; set; }
        public string SSN { get; set; }
        public string gender { get; set; }
        public string nationalID { get; set; }
        public int birthDate { get; set; }
        public string address { get; set; }
        
        public string nationality { get; set; }
        public string telNumber { get; set; }
        public double rating { get; set; }
        public DateTime startDate { get; set; }
        public string status { get; set; }
        public string email { get; set; }
        public bool active { get; set; }
        public int sectorID { get; set; }
        public int departmentID { get; set; }
        public  int HRID { get; set; }


    }
}
