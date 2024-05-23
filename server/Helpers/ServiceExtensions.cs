using Microsoft.EntityFrameworkCore;
using Web02.Interface;
using Web02.Models;
using Web02.Services;
namespace Web02.Helpers
{
    public static class ServiceExtensions
    {
        public static void AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
        }

        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<WebDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });
        }
    }
}
