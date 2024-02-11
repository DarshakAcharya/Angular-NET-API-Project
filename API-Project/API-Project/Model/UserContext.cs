using Microsoft.EntityFrameworkCore;

namespace API_Project.Model
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions options)
                : base(options)
         {
         }
        public DbSet<User> Users { get; set; }

        public DbSet<Products> Products { get; set; }

        public DbSet<Category> Category { get; set; }

    }
}
