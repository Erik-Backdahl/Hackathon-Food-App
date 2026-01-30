using Microsoft.EntityFrameworkCore;

class ConvertJson
{
    public static async Task SaveToDataBase(Recipe recipe, FoodAppDbContext dbContext)
    {
        // Create a dictionary of existing ingredients
        var ingredientIds = recipe.RecipeIngredients.Select(ri => ri.Ingredient.Id).ToList();
        var existingIngredients = await dbContext.Ingredients
            .Where(i => ingredientIds.Contains(i.Id))
            .ToDictionaryAsync(i => i.Id);

        foreach (var ri in recipe.RecipeIngredients)
        {
            if (existingIngredients.TryGetValue(ri.Ingredient.Id, out var existingIngredient))
            {
                // Use the existing DB entity
                ri.Ingredient = existingIngredient;
            }
            else
            {
                // Add new ingredient
                dbContext.Ingredients.Add(ri.Ingredient);
            }
        }

        dbContext.Recipes.Add(recipe);
        await dbContext.SaveChangesAsync();
    }


    public static async Task<Recipe> ConvertToRecipeAsync(RecipeJson json)
    {
        var recipe = new Recipe
        {
            Name = json.title,
            ReadyInMinutes = json.readyInMinutes,
            Vegetarian = json.vegetarian,
            Vegan = json.vegan,
            GlutenFree = json.glutenFree,
            DairyFree = json.dairyFree,
            Healthy = json.veryHealthy,
            Cheap = json.cheap,
            Sustainable = json.sustainable,
            LowFodMap = json.lowFodmap,
            Summary = json.summary,
            Instructions = json.instructions
        };

        // Download image
        if (!string.IsNullOrEmpty(json.image))
        {
            using var client = new HttpClient();
            recipe.Picture = await client.GetByteArrayAsync(json.image);
        }

        // Map ingredients
        foreach (var ing in json.extendedIngredients)
        {
            var ingredient = new Ingredient
            {
                Name = ing.name,
                Aisle = ing.aisle
            };

            recipe.RecipeIngredients.Add(new RecipeIngredient
            {
                Recipe = recipe,
                Ingredient = ingredient,
                Amount = ing.amount,
                Unit = ing.unit
            });
        }

        return recipe;
    }

}

public class RecipeJson
{
    public string title { get; set; } = null!;
    public string image { get; set; } = null!;
    public int readyInMinutes { get; set; }
    public bool vegetarian { get; set; }
    public bool vegan { get; set; }
    public bool glutenFree { get; set; }
    public bool dairyFree { get; set; }
    public bool veryHealthy { get; set; }
    public bool cheap { get; set; }
    public bool sustainable { get; set; }
    public bool lowFodmap { get; set; }
    public string summary { get; set; } = null!;
    public string instructions { get; set; } = null!;
    public List<IngredientJson> extendedIngredients { get; set; } = new();
}

public class IngredientJson
{
    public string? aisle { get; set; } = null;
    public string name { get; set; } = null!;
    public decimal amount { get; set; }
    public string unit { get; set; } = null!;
}

public class RecipesRoot
{
    public List<RecipeJson> recipes { get; set; } = new();
}
