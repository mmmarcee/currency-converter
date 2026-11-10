using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace prodject67.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTelegramConfirmationFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TelegramConfirmationToken",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TelegramTokenExpiresAt",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TelegramConfirmationToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TelegramTokenExpiresAt",
                table: "AspNetUsers");
        }
    }
}
