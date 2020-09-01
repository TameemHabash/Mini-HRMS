using API_HRMS.Data;
using API_HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API_HRMS.Util
{
    public class EmpUtil
    {
       
        public static void CalculateDailyHour(EmpContext _context, List<Attendance> listAttend)
        {
            

            foreach (var item in listAttend)
            {
                var xAttendance = _context.Attendance.Find(item.attendanceID);
                var xEntry = xAttendance.entry;
                var xLeave = xAttendance.leave;
                var xEID = xAttendance.employeeID;
                TimeSpan time = xLeave.Subtract(xEntry);
                xAttendance.dailyHours = time;
                Random random = new Random();
                var xNullEntry = xEntry.Equals(DateTime.MinValue); // "0001-01-01T00:00:00" FORMAT OR BUGS WILL COME 
                xNullEntry.ToString();
                if (xNullEntry == true)// "0001-01-01T00:00:00" FORMAT OR BUGS WILL COME 
                {
                    var ne = new Absence()
                    {
                        absenceID =  random.Next(0,1000), // random id for absence
                        absenceDate = item.attendanceDate, // 
                        employeeID = item.employeeID,
                        excuse = false
                    };
                    _context.Absence.Add(ne);

                }

                try
                {
                    _context.SaveChanges();

                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }
        public static void CalculateSalary(EmpContext _context, int id, List<Attendance> listAttend)
        {
            Random random = new Random();
            //calculate salary
            var SumInMinute = listAttend.Sum(c => c.dailyHours.TotalMinutes); // sum total minutes
            var SumInHour = SumInMinute / 60;                                // minutes to hours
            var xA = SumInHour - CommonValues.WholeMonthHour;              // subtract total real hours from the whole month standard
            double xSalary = 0;
            double xBonus = 0;

            if (xA <= 0)                                                   //if attendance less than 176
            {
                xSalary = SumInHour * CommonValues.HourPrice;              //give the standard price for the hour*attendanceHours


            }
            else
            {
                xSalary = (xA * CommonValues.HourPrice * CommonValues.HourBonusFactor)
                            + CommonValues.WholeMonthHour * CommonValues.HourPrice; // give the standard price for the hour*attendanceHours + bonus
                xBonus = xA;
            }

            /// save salary
            var xSa = new Salary()
            {
                amount = xSalary,        
                employeeID = id
            };

            var xRemoveItems = _context.Salaries.Where(c => c.employeeID == id).ToList();
            _context.Salaries.RemoveRange(xRemoveItems);
            _context.Salaries.Add(xSa);

            var xSaLog = new SalaryLog()
            {
                _salaryID = xSa._salaryID,
                value = xSa.amount.Nvl(0d),
                bonus = xBonus
            };

            _context.SalaryLog.Add(xSaLog);

         
            try
            {
                _context.SaveChanges();

            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public static void Distribution(EmpContext _context , int id , List<Department> ListDepartment , List<Employee> employees , List<Sector> sectors)
        {
            var listDepartment = ListDepartment.Where(c => c._ID == id).ToList();
            var listEmployees = employees.Where(c => c.departmentID == id).ToList();
           
            var sec = new Sector()
            {
                _departmentID = id
            };
            _context.Sector.Add(sec);
            try
            {
                _context.SaveChanges();

            }
            catch (Exception ex)
            {

                throw;
            }




        }
    }
}

