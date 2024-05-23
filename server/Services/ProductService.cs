using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Web02.Interface;
using Web02.Models;
using Web02.Models.Common;
using Web02.Request;
using Web02.ViewModels;

namespace Web02.Services;

public class ProductService : IProductService
{
    private readonly WebDbContext _context;

    public ProductService(WebDbContext context)
    {
        _context = context;
    }

    public async Task<Object> GetAllProductsAsync()
    {
        var products = await _context.Products.ToListAsync();
        return new ApiResponse<List<ProductViewModel>>()
        {
            Error = products.IsNullOrEmpty() ? true : false,
            Message = products.IsNullOrEmpty() ? "There are no products in the list" : "List of products",
            Data = products.IsNullOrEmpty() ? null : products.Select(p => new ProductViewModel(p.ID, p.Name, p.Desc, p.Price)).Reverse().ToList()
        };
    }

    public async Task<Object> GetProductById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        return new ApiResponse<ProductViewModel>()
        {
            Error = product == null ? true : false,
            Message = product == null ? "This product was not found" : "This product found successfully",
            Data = product != null ? new ProductViewModel(product.ID, product.Name, product.Desc, product.Price) : null,
        };
    }

    public async Task<Object> CreateProduct(CreateProductRequest productRequest)
    {
        var product = new Product()
        {
            Name = productRequest.Name,
            Desc = productRequest.Desc,
            Price = productRequest.Price,
        };
        await _context.Products.AddAsync(product);
        int isChecked = await _context.SaveChangesAsync();
        return new ApiResponse<Object>()
        {
            Error = isChecked > 0 ? false : true,
            Message = isChecked > 0 ? "Create product successfully" : "Create product failed",
        };
    }

    public async Task<Object> RemoveProductById(int productId)
    {
        var product = await _context.Products.SingleOrDefaultAsync(p => p.ID == productId);
        if (product == null)
        {
            return new ApiResponse<ProductViewModel>()
            {
                Error = false,
                Message = "This product was not found"
            };
        }
        _context.Products.Remove(product);
        int isChecked = await _context.SaveChangesAsync();
        return new ApiResponse<Object>()
        {
            Error = isChecked > 0 ? false : true,
            Message = isChecked > 0 ? "Remove this product successfully" : "Remove this product failed",
        };
    }

    public async Task<Object> EditProductById(int id, CreateProductRequest product)
    {
        var productOld = await _context.Products.FindAsync(id);
        if (productOld == null)
        {
            return new ApiResponse<Object>()
            {
                Error = true,
                Message = "Product not found"
            };
        }

        productOld.Name = product.Name;
        productOld.Desc = product.Desc;
        productOld.Price = product.Price;

        try
        {
            int isChecked = await _context.SaveChangesAsync();
            return new ApiResponse<Object>()
            {
                Data = new
                {
                    Id = id,
                    Product = product,
                    ProductOld = productOld
                },
                Error = isChecked > 0 ? false : true,
                Message = isChecked > 0 ? "Edit this product successfully" : "Edit this product failed",
            };
        }
        catch (Exception ex)
        {
            return new ApiResponse<Object>()
            {
                Error = true,
                Message = "An error occurred while updating the product"
            };
        }
    }

}