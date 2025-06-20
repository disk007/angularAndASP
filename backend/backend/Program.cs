using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DBContextcs>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnect"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
  options.AllowAnyHeader();
  options.AllowAnyOrigin();
  options.AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
