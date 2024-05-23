using Microsoft.AspNetCore.Mvc;
using Web02.Interface;
using Web02.Models;
using Web02.Request;
namespace Web02.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }


    //Get all product
    [HttpGet("getallproduct", Name = "GetAllProduct")]
    public async Task<IActionResult> GetAllProduct()
    {
        try
        {
            var response = await _productService.GetAllProductsAsync();
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest("Error at Controllers/ProductControllers/GetAllProduct.cs");
        }
    }

    //Get product by id
    [HttpGet("getproductbyid/{id}", Name = "GetProductById")]
    public async Task<IActionResult> GetProductById(int id)
    {
        try
        {
            var response = await _productService.GetProductById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest("Error at Controllers/ProductControllers/GetProductById.cs");
        }
    }

    //Create product
    [HttpPost("createproduct", Name = "CreateProduct")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequest product)
    {
        try
        {
            var response = await _productService.CreateProduct(product);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest("Error at Controllers/ProductControllers/CreateProduct.cs");
        }
    }

    //Edit product by Id
    [HttpPut("editproduct/{id}", Name = "EditProduct")]
    public async Task<IActionResult> EditProductById(int id, [FromBody] CreateProductRequest product)
    {
        try
        {
            var response = await _productService.EditProductById(id, product);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest("Error at Controllers/ProductControllers/RemoveProductById.cs");
        }
    }

    //Remove product by Id
    [HttpDelete("removeproductbyid/{id}", Name = "RemoveProductById")]
    public async Task<IActionResult> RemoveProductById(int id)
    {
        try
        {
            var response = await _productService.RemoveProductById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest("Error at Controllers/ProductControllers/RemoveProductById.cs");
        }
    }
}