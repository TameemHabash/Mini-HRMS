using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_HRMS.Data;
using API_HRMS.Models;
using System.Diagnostics;
using System.Collections;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Internal;
using API_HRMS.Util;

namespace API_HRMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendancesController : ControllerBase
    {
        private readonly EmpContext _context;

        public AttendancesController(EmpContext context)
        {
            _context = context;
        }



        // GET: api/Attendances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAttendance()
        {
            //List<Attendance> attendancesList = _context.Attendance.ToList();
            //List<Employee> employeeList = _context.Employees.ToList();
            //var countList = attendancesList.Count();
            //var h_sum = from att in attendancesList
            //            group att by att.employeeID into g
            //            select g.Sum(x => x.dailyHours.Hours);

            return await _context.Attendance.ToListAsync();

        }

        // GET: api/Attendances/5
        [HttpGet("{id}")]
        [Obsolete]
        public async Task<ActionResult<List<Attendance>>> GetAttendance(int id)
        {
            var listAttend = _context.Attendance.Where(c => c.employeeID == id).ToList();

            //double wholeDayPoints = 0.2272;
            //double wholeHourPoints = wholeDayPoints / 8;
            ////////
            // List<Employee> employeeList = _context.Employees.ToList();

            //var xAttendance = _context.Attendance.Find(id);

            //var xEntry = xAttendance.entry;
            //var xLeave = xAttendance.leave;
            //var xEID = xAttendance.employeeID;
            //TimeSpan time = xLeave.Subtract(xEntry);
            //xAttendance.dailyHours = time;

            EmpUtil.CalculateDailyHour(_context, listAttend);
            EmpUtil.CalculateSalary(_context, id, listAttend);





            ////////
            //var actionResult = GetAttendance();
            //var getAttendanceList = actionResult.Result.Value.ToList();
            //var countAttendance = getAttendanceList.GroupBy(x => x.employeeID).Select(p => p.Key);
            //countAttendance.ToString();
            // daily hour

            //var attendance = await _context.Attendance.FindAsync(id);

            //try
            //{
            //    _context.SaveChanges();

            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}

            if (listAttend == null)
            {
                return NotFound();
            }
            return listAttend;

        }













        // PUT: api/Attendances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, Attendance attendance)
        {
            if (id != attendance.attendanceID)
            {
                return BadRequest();
            }

            _context.Entry(attendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Attendances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(Attendance attendance)
        {
            _context.Attendance.Add(attendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendance", new { id = attendance.attendanceID }, attendance);
        }

        // DELETE: api/Attendances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Attendance>> DeleteAttendance(int id)
        {
            var attendance = await _context.Attendance.FindAsync(id);
            if (attendance == null)
            {
                return NotFound();
            }

            _context.Attendance.Remove(attendance);
            await _context.SaveChangesAsync();

            return attendance;
        }

        private bool AttendanceExists(int id)
        {
            return _context.Attendance.Any(e => e.attendanceID == id);
        }
    }
}
