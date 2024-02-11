using API_Project.Model;
using API_Project.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.Services
{

    public class ProductService : IProductService
    {
 
        private readonly UserContext _context;

        public ProductService(UserContext context)
        {
            _context = context;
        }

        //public async Task<List<Products>> GetProducts()
        //{
        //    var a = await _context.Products.ToListAsync();
        //    return a;   
        //}
        public async Task<List<Products>> GetProducts(FilterParams filterParams)
        {

            var products = _context.Products.Include(p => p.Category).ToList();

            //var products = _context.Products.ToList();

            //var products = _context.Products
            //.Join(
            //     _context.Category,
            //     p => p.CategoryID,
            //     c => c.CategoryID,
            //    (p, c) => new { Product = p, CategoryName = c.CategoryName }
            //      )
            //      .ToList();

            //var products = await _context.Products
            // .Join(
            //     _context.Category,
            //      p => p.CategoryID,
            //      c => c.CategoryID,
            //     (p, c) => new ProductWithCategory { Product = p, CategoryName = c.CategoryName }
            //      )
            //     .ToListAsync();



            var FilteredPs = products;


            if (!string.IsNullOrEmpty(filterParams.Search))
            {
                 FilteredPs = products.Where(a => a.productName.Contains(filterParams.Search) || a.companyName.Contains(filterParams.Search) || a.Category.CategoryName.Contains(filterParams.Search) || a.boughtFrom.Contains(filterParams.Search) || a.price.Contains(filterParams.Search)).ToList();
            }
           
            

            if(!string.IsNullOrEmpty(filterParams.FBboughtfrom))
            {
                FilteredPs = FilteredPs.Where(a=>a.boughtFrom == filterParams.FBboughtfrom).ToList();
            }

            if(!string.IsNullOrEmpty(filterParams.FBcategory))
            {
                FilteredPs = FilteredPs.Where(b=>b.Category.CategoryName == filterParams.FBcategory).ToList();
            }

            filterParams.totalProducts = FilteredPs.Count;


            switch (filterParams.sortBy.ToLower())
                {
                    case "productnameasc":
                    FilteredPs = FilteredPs.OrderBy(p => p.productName).ToList();
                        break;
                    case "productnamedesc":
                    FilteredPs = FilteredPs.OrderByDescending(a => a.productName).ToList();
                        break;
                    case "companyasc":
                    FilteredPs = FilteredPs.OrderBy(p => p.companyName).ToList();
                        break;
                    case "companydesc":
                    FilteredPs = FilteredPs.OrderByDescending(a => a.companyName).ToList();
                        break;
                    case "categoryasc":
                    FilteredPs = FilteredPs.OrderBy(p => p.Category.CategoryName).ToList();
                        break;
                    case "categorydesc":
                    FilteredPs = FilteredPs.OrderByDescending(a => a.Category.CategoryName).ToList();
                        break;
                    case "priceasc":
                    FilteredPs = FilteredPs.OrderBy(p => p.price).ToList();
                        break;
                    case "pricedesc":
                    FilteredPs = FilteredPs.OrderByDescending(a => a.price).ToList();
                        break;
                    case "boughtfromasc":
                    FilteredPs = FilteredPs.OrderBy(p => p.boughtFrom).ToList();
                        break;
                    case "boughtfromdesc":
                    FilteredPs = FilteredPs.OrderByDescending(a => a.boughtFrom).ToList();
                        break;
                    default:
                    FilteredPs = FilteredPs.ToList();
                        break;
                }


            return FilteredPs
            .Skip((filterParams.page - 1) * filterParams.pageSize)
            .Take(filterParams.pageSize)
            .ToList();
        }

        

        public  List<Category> GetCategories()
        {
            var categories = _context.Category.ToList();

            return categories; 
        }


        public async Task<Products> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        //public async Task<ProductsInput> CreateProduct(ProductsInput product)
        //{
        //    try
        //    {
        //        _context.Products.Add(product);
        //        await _context.SaveChangesAsync();

        //        return product;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception or handle it accordingly
        //        // You can also return a specific error message to the client
        //        throw; // Rethrow the exception or return an error response
        //    }
        //}

        public async Task<Products> CreateProduct(Products product)
        {
            try
            {
                var newProduct = new Products();
                if(product.Category != null)
                {
                    product.Category = null;
                }
               

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                //var returnProduct = new ProductsInput
                //{
                //    companyName = newProduct.companyName,
                //    productName = newProduct.productName,
                //    boughtFrom = newProduct.boughtFrom,
                //    price = newProduct.price,
                //    productID = newProduct.productID,
                //    CategoryID = newProduct.CategoryID
                //};
                return product;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                // You can also return a specific error message to the client
                throw; // Rethrow the exception or return an error response
            }
        }


        public async Task<bool> UpdateProduct(int id, Products product)
        {
            if (id != product.productID)
            {
                return false;
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;

        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;

        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(p => p.productID == id);
        }


    }
}

//var A = new Products();
//if(A.Category != null)
//{
//    A.CategoryID = A.Category.CategoryID;
//    A.Category = null;
//}
