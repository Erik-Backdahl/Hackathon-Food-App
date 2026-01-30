using Microsoft.EntityFrameworkCore;

public partial class FoodAppDbContext : DbContext
{
    public FoodAppDbContext(DbContextOptions<FoodAppDbContext> options) : base(options)
    {

    }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeIngredient>()
        .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

        // Relationships
        modelBuilder.Entity<RecipeIngredient>()
            .HasOne(ri => ri.Recipe)
            .WithMany(r => r.RecipeIngredients)
            .HasForeignKey(ri => ri.RecipeId);

        modelBuilder.Entity<RecipeIngredient>()
            .HasOne(ri => ri.Ingredient)
            .WithMany(i => i.RecipeIngredients)
            .HasForeignKey(ri => ri.IngredientId);
        
        modelBuilder.Entity<RecipeIngredient>()
        .Property(ri => ri.Amount)
        .HasPrecision(10, 2);

            modelBuilder.Entity<Recipe>()
        .Property(r => r.Picture)
        .HasColumnType("varbinary(max)");

        
    }
}