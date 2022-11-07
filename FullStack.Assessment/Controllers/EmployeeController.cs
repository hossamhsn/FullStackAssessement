using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using FullStack.Assessment.Data;
using FullStack.Assessment.Models;
using Microsoft.AspNetCore.Authorization;

namespace FullStack.Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Employee
        [HttpGet("GetEmployee")]
        public async Task<List<Employee>> GetEmployee()
        {
            return await _context.Employees.ToListAsync();
        }



        [HttpPost("AddEmployee")]
        public async Task<bool> AddEmployee([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
            {
                _context.Add(employee);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        [HttpPut("UpdateEmployee")]
        public async Task<bool> UpdateEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return false;
            }

            var emp = await _context.Employees.AsNoTracking().FirstAsync(x=>x.Id == employee.Id);
            if (emp == null)
            {
                return false;
            }
            else
            {
                _context.Update(employee);
                await _context.SaveChangesAsync();
                return true;
            }
        }


        [HttpDelete("DeleteEmployee")]
        public async Task<bool> DeleteEmployee(int? id)
        {
            if (id == null)
            {
                return false;
            }

            var employee = await _context.Employees
                .FirstOrDefaultAsync(m => m.Id == id);
            if (employee == null)
            {
                return false;
            }
            else
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return true;
            }
        }

    }
}
