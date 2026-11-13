using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace prodject67.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTelegramFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TelegramChatId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TelegramConfirmationToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TelegramTokenExpiresAt",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TelegramChatId",
                table: "AspNetUsers",
                type: "bigint",
                nullable: true);

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
    }
}
