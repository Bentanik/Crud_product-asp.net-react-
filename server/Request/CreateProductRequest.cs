namespace Web02.Request;

public class CreateProductRequest
{
    public string Name { get; set; }
    public string Desc { get; set; }
    public double Price { get; set; }


    public CreateProductRequest() { }
    public CreateProductRequest(string name, string desc, double price)
    {
        Name = name;
        Desc = desc;
        Price = price;
    }
}