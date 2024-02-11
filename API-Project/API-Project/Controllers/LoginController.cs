using API_Project.Model;
using API_Project.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using ControllerBase = Microsoft.AspNetCore.Mvc.ControllerBase;


namespace API_Project.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {

		private readonly IJWTManagerRepository _jWTManager;

		public LoginController(IJWTManagerRepository jWTManager)
		{
			this._jWTManager = jWTManager;
		}

		[HttpGet]
		public List<string> Get()
		{
			var users = new List<string>
		{
			"Darshak Acharya",
			 
		};

			return users;
		}

		[AllowAnonymous]
		[HttpPost]
		[Route("authenticate")]
		public IActionResult Authenticate(User usersdata)
		{
			var token = _jWTManager.Authenticate(usersdata);

			if (token == null)
			{
				return Unauthorized();
			}

			return Ok(token);
		}

	}
}
