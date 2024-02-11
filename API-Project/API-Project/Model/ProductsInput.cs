using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Project.Model
{
    public class ProductsInput
    {
        public string companyName { get; set; }

        public string productName { get; set; }

        public string boughtFrom { get; set; }

        public string price { get; set; }

        [Key]
        public int productID { get; set; }
       
        public int CategoryID { get; set; }
       
    }
}
