class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int ReadyInMinutes { get; set; }
    public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}