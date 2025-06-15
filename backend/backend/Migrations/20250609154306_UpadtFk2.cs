using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpadtFk2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_roleId",
                table: "Users",
                column: "roleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_roleId",
                table: "Users",
                column: "roleId",
                principalTable: "Roles",
                principalColumn: "roleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_roleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_roleId",
                table: "Users");
        }
    }
}
