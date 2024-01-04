using BackendApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public StoreController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetStore")]

        public async Task<IEnumerable<Store>> GetStores()
        {
            return await _context.Stores.ToListAsync();
        }

        [HttpPost]
        [Route("AddStore")]
        public async Task<Store> AddStore(Store objStore)
        {
            _context.Stores.Add(objStore);
            await _context.SaveChangesAsync();
            return objStore;
        }

        [HttpPatch]
        [Route("UpdateStore/{id}")]
        public async Task<Store> UpdateStore(Store objStore)
        {
            _context.Entry(objStore).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objStore;
        }

        [HttpDelete]
        [Route("DeleteStore/{id}")]
        public bool DeleteStore(int id)
        {
            bool a = false;
            var Store = _context.Stores.Find(id);
            if (Store != null)
            {
                a = true;
                _context.Entry(Store).State = EntityState.Deleted;
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
