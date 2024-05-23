namespace Web02.ViewModels;

public class ProductViewModel
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Desc { get; set; }
    public double Price { get; set; }

    public ProductViewModel()
    {
    }

    public ProductViewModel(int id, string name, string desc, double price)
    {
        ID = id;
        Name = name;
        Desc = desc;
        Price = price;
    }
}