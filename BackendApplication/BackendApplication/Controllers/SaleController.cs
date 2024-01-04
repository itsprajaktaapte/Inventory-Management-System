using BackendApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SaleController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetSale")]

        public async Task<IEnumerable<Sale>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        [HttpPost]
        [Route("AddSale")]
        public async Task<Sale> AddSale(Sale objSale)
        {
            _context.Sales.Add(objSale);
            await _context.SaveChangesAsync();
            return objSale;
        }

        [HttpPatch]
        [Route("UpdateSale/{id}")]
        public async Task<Sale> UpdateSale(Sale objSale)
        {
            _context.Entry(objSale).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objSale;
        }

        [HttpDelete]
        [Route("DeleteSale/{id}")]
        public bool DeleteSale(int id)
        {
            bool IsSuccess = false;
            var Sale = _context.Sales.Find(id);
            if (Sale != null)
            {
                IsSuccess = true;
                _context.Entry(Sale).State = EntityState.Deleted;
                _context.SaveChanges();
            }
            else
            {
                IsSuccess = false;
            }
            return IsSuccess;
        }
    }
}
