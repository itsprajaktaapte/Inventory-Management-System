using BackendApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ProductController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProduct")]

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<Product> AddProduct(Product objProduct)
        {
            _context.Products.Add(objProduct);
            await _context.SaveChangesAsync();
            return objProduct;
        }

        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<Product> UpdateProduct(Product objProduct)
        {
            _context.Entry(objProduct).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objProduct;
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public bool DeleteProduct(int id)
        {
            bool a = false;
            var Product = _context.Products.Find(id);
            if (Product != null)
            {
                a = true;
                _context.Entry(Product).State = EntityState.Deleted;
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
