using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedPictureColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Recipes",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Aisle",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Aisle",
                table: "Ingredients");
        }
    }
}
