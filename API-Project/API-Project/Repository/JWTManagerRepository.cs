using API_Project.Model;
 
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_Project.Repository
{
	public class JWTManagerRepository : IJWTManagerRepository
	{
        //Dictionary<string, string> UsersRecords = new Dictionary<string, string>
        //{
        //    { "darshakacharya2625@gmail.com","12345"},
        //    { "user","password"},
        //    { "user3","password3"},
        //};

        private readonly UserContext _context;
        private readonly IConfiguration iconfiguration;
        public JWTManagerRepository(UserContext context, IConfiguration iconfiguration)
        {
            _context = context;
            this.iconfiguration = iconfiguration;
        }



        public Tokens Authenticate(User users)
		{
			if (!_context.Users.Any(x => x.Email == users.Email && x.Password == users.Password))
			{
				return null;
			}

			// Else we generate JSON Web Token
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
			  {
			 new Claim(ClaimTypes.Email, users.Email)
			  }),
				Expires = DateTime.UtcNow.AddMinutes(10),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return new Tokens { Token = tokenHandler.WriteToken(token) };

		}
	}
}
