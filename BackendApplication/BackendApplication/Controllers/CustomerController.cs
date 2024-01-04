using BackendApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly DatabaseContext _context;
    
        public CustomerController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetCustomer")]

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        [HttpPost]
        [Route("AddCustomer")]
        public async Task<Customer> AddCustomer(Customer objCustomer)
        {
            _context.Customers.Add(objCustomer);
            await _context.SaveChangesAsync();
            return objCustomer;
        }

        [HttpPatch]
        [Route("UpdateCustomer/{id}")]
        public async Task<Customer> UpdateCustomer(Customer objCustomer)
        {
            _context.Entry(objCustomer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objCustomer;
        }

        [HttpDelete]
        [Route("DeleteCustomer/{id}")]
        public bool DeleteCustomer(int id)
        {
            bool a = false;
            var Customer = _context.Customers.Find(id);
            if (Customer != null)
            {
                a = true;
                _context.Entry(Customer).State = EntityState.Deleted;
                _context.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }


    }
}
