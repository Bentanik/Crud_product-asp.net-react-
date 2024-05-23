using Microsoft.EntityFrameworkCore;

namespace Web02.Models;

public class WebDbContext : DbContext
{
    public WebDbContext(DbContextOptions options) : base(options) { }

    #region Db<Set>
    public DbSet<Product> Products { get; set; }
    #endregion
}