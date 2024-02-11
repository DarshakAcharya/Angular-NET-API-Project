using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Project.Services;
using API_Project.Model; // Replace with your namespace for the models
using API_Project.Repository; // Replace with your namespace for the data context

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productservice;

        public ProductsController(IProductService productService)
        {
            _productservice = productService;
        }

        // GET: api/Products
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        //{
        //    var products = await _productservice.GetProducts();
        //    return Ok(products);
        //}



        [HttpGet]
        public async Task<ActionResult<List<Products>>> GetProducts([FromQuery] FilterParams filterParams)
        {
            var products = await _productservice.GetProducts(filterParams);

            var totalCount = filterParams.totalProducts;
            var totalPages = (int)Math.Ceiling(totalCount / (double)filterParams.pageSize);

            var response = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                Page = filterParams.page,
                PageSize = filterParams.pageSize,
                Products = products.ToList(),
            };

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Total-Pages", totalPages.ToString());

            return Ok(response);
        }


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Products>>> GetProducts([FromQuery] int page , [FromQuery] int pageSize )
        //{

        //    var products = Enumerable.Empty<Products>();

        //    //products = await _productservice.SortProducts(sortBy.ToLower());

        //     products = await _productservice.GetProducts(page, pageSize );

        //    var totalCount = await _productservice.GetTotalProductCount();

        //    var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        //    var response = new
        //    {
        //        TotalCount = totalCount,
        //        TotalPages = totalPages,
        //        Page = page,
        //        PageSize = pageSize,
        //        Products = products
        //    };

        //    Response.Headers.Add("X-Total-Count", totalCount.ToString());
        //    Response.Headers.Add("X-Total-Pages", totalPages.ToString());

        //    return Ok(response);
        //}



        //[HttpGet("SortBy")]
        //public async Task<ActionResult<IEnumerable<Products>>> SortBy(string sortBy)
        //{
        //    var products = Enumerable.Empty<Products>();

        //    products = await _productservice.SortProducts(sortBy.ToLower());

        //   return Ok(products);
        //}




        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _productservice.GetProduct(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
        [HttpPost("AddProduct")]
        public async Task<ActionResult<Products>> CreateProduct(Products product)
        {
            var createdProduct = await _productservice.CreateProduct(product);

            return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.productID }, createdProduct);
        }

        // PUT: api/Products/5
        [HttpPut("updateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Products product)
        {
            var result = await _productservice.UpdateProduct(id, product);
            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpPost("deleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productservice.DeleteProduct(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();

        }

        [HttpGet("GetCategories")]
        public List<Category> GetCategories()
        {
            var categories = _productservice.GetCategories(); 

            return categories;
        }

      
    }
}

