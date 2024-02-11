using API_Project.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Project.Services
{
    public interface IProductService
    {
        Task<List<Products>> GetProducts(FilterParams filterParams);


        List<Category> GetCategories();
       

        Task<Products> GetProduct(int id);
        Task<Products> CreateProduct(Products product);
        Task<bool> UpdateProduct(int id, Products product);
        Task<bool> DeleteProduct(int id);
    }
}
