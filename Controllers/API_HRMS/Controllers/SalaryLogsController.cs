using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_HRMS.Data;
using API_HRMS.Models;

namespace API_HRMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryLogsController : ControllerBase
    {
        private readonly EmpContext _context;

        public SalaryLogsController(EmpContext context)
        {
            _context = context;
        }

        // GET: api/SalaryLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaryLog>>> GetSalaryLog()
        {
            return await _context.SalaryLog.ToListAsync();
        }

        // GET: api/SalaryLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaryLog>> GetSalaryLog(int id)
        {
            var salaryLog = await _context.SalaryLog.FindAsync(id);

            if (salaryLog == null)
            {
                return NotFound();
            }

            return salaryLog;
        }

        // PUT: api/SalaryLogs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaryLog(int id, SalaryLog salaryLog)
        {
            if (id != salaryLog._logID)
            {
                return BadRequest();
            }

            _context.Entry(salaryLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryLogExists(id))
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

        // POST: api/SalaryLogs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SalaryLog>> PostSalaryLog(SalaryLog salaryLog)
        {
            _context.SalaryLog.Add(salaryLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaryLog", new { id = salaryLog._logID }, salaryLog);
        }

        // DELETE: api/SalaryLogs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalaryLog>> DeleteSalaryLog(int id)
        {
            var salaryLog = await _context.SalaryLog.FindAsync(id);
            if (salaryLog == null)
            {
                return NotFound();
            }

            _context.SalaryLog.Remove(salaryLog);
            await _context.SaveChangesAsync();

            return salaryLog;
        }

        private bool SalaryLogExists(int id)
        {
            return _context.SalaryLog.Any(e => e._logID == id);
        }
    }
}
