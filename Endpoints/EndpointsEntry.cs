using Microsoft.EntityFrameworkCore;

public static class EndpointEntry
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/testing");

        group.MapGet("/add-recipe", async (HttpContext httpContext, FoodAppDbContext db) =>
        {
            
            return Results.Ok();
        });
        group.MapGet("/", async (FoodAppDbContext db) =>
        {
            Console.WriteLine("HÄR2222");
            
        });
        return app;
    }
}
