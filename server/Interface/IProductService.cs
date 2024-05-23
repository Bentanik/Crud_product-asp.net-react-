using Web02.Models;
using Web02.Request;
using Web02.ViewModels;

namespace Web02.Interface;

public interface IProductService
{
    // Return list product view model
    Task<Object> GetAllProductsAsync();
    // Return a product by id of product
    Task<Object> GetProductById(int id);
    // Create new product
    Task<Object> CreateProduct(CreateProductRequest product);
    // Edit product
    Task<Object> EditProductById(int id, CreateProductRequest product);
    // Remove product by Id
    Task<Object> RemoveProductById(int id);
}