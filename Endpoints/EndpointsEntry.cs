using Microsoft.EntityFrameworkCore;

public static class EndpointEntry
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/testing");

        group.MapPost("/add-recipes", async (FoodAppDbContext dbContext, RecipesRoot root) =>
        {
            foreach (var recipeJson in root.recipes)
            {
                var recipe = await ConvertJson.ConvertToRecipeAsync(recipeJson);
                await ConvertJson.SaveToDataBase(recipe, dbContext);
            }

            return Results.Ok();
        });
        return app;
    }
}
