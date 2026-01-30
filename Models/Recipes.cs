public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public byte[]? Picture { get; set; }
    public int ReadyInMinutes { get; set; }
    public bool Vegetarian { get; set; } = false;
    public bool Vegan { get; set; } = false;
    public bool GlutenFree { get; set; } = false;
    public bool DairyFree { get; set; } = false;
    public bool Healthy { get; set; } = false;
    public bool Cheap { get; set; } = false;
    public bool Sustainable { get; set; } = false;
    public bool LowFodMap { get; set; } = false;
    public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}