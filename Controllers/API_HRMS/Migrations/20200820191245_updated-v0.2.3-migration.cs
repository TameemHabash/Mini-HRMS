using Microsoft.EntityFrameworkCore.Migrations;

namespace API_HRMS.Migrations
{
    public partial class updatedv023migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "departmentID",
                table: "Employees",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "departmentID",
                table: "Employees");
        }
    }
}
