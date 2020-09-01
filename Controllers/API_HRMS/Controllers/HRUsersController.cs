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
    public class HRUsersController : ControllerBase
    {
        private readonly EmpContext _context;

        public HRUsersController(EmpContext context)
        {
            _context = context;
        }

        // GET: api/HRUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HRUser>>> GetHRUser()
        {
            return await _context.HRUser.ToListAsync();
        }

        // GET: api/HRUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HRUser>> GetHRUser(int id)
        {
            var hRUser = await _context.HRUser.FindAsync(id);

            if (hRUser == null)
            {
                return NotFound();
            }

            return hRUser;
        }

        // PUT: api/HRUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHRUser(int id, HRUser hRUser)
        {
            if (id != hRUser._HRID)
            {
                return BadRequest();
            }

            _context.Entry(hRUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HRUserExists(id))
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

        // POST: api/HRUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HRUser>> PostHRUser(HRUser hRUser)
        {
            _context.HRUser.Add(hRUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHRUser", new { id = hRUser._HRID }, hRUser);
        }

        // DELETE: api/HRUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HRUser>> DeleteHRUser(int id)
        {
            var hRUser = await _context.HRUser.FindAsync(id);
            if (hRUser == null)
            {
                return NotFound();
            }

            _context.HRUser.Remove(hRUser);
            await _context.SaveChangesAsync();

            return hRUser;
        }

        private bool HRUserExists(int id)
        {
            return _context.HRUser.Any(e => e._HRID == id);
        }
    }
}
