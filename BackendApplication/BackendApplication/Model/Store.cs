using System.ComponentModel.DataAnnotations;

namespace BackendApplication.Model
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
