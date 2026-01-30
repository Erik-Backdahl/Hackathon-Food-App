using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedBools : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Cheap",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DairyFree",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "GlutenFree",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Healthy",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LowFodMap",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Sustainable",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Vegan",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Vegetarian",
                table: "Recipes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cheap",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "DairyFree",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "GlutenFree",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Healthy",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "LowFodMap",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Sustainable",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vegan",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vegetarian",
                table: "Recipes");
        }
    }
}
