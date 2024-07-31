using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vechicalManagement.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Items",
                table: "WorkItems");

            migrationBuilder.AddColumn<int>(
                name: "VehicleId",
                table: "WorkItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "WorkItems");

            migrationBuilder.AddColumn<string>(
                name: "Items",
                table: "WorkItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
