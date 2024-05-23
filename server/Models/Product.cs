using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web02.Models;

[Table("Product")]
public class Product
{
    [Key]
    public int ID { get; set; }
    [Required]
    [MaxLength(50)]
    public string Name { get; set; }
    [Required]
    public string Desc { get; set; }
    [Required]
    public double Price { get; set; }
}