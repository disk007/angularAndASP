using backend.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
  public class DBContextcs: DbContext
  {
    public DBContextcs(DbContextOptions options) : base(options)
    {

    }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
  }
}
