using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_HRMS.Models
{
    public class HRUser
    {
        [Key]
        public int _HRID { get; set; }
        public string _userName { get; set; }
        public string _password { get; set; }
        public string _email { get; set; }
        public string? _image { get; set; }

    }
}
