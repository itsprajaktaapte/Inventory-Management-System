using System.ComponentModel.DataAnnotations;
namespace BackendApplication.Model
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
        public DateTime Datesold { get; set; }
    }
}
