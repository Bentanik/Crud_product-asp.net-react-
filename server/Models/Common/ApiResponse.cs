namespace Web02.Models.Common;

public class ApiResponse<T>
{
    public bool Error { get; set; }
    public T Data { get; set; }
    public string Message { get; set; }

    public ApiResponse(bool error, T data, string messsage)
    {
        Error = error;
        Data = data;
        Message = messsage;
    }

    public ApiResponse()
    {
    }
}

