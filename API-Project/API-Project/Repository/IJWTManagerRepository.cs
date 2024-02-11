using API_Project.Model;
//using JWTWebAuthentication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.Repository
{
    public interface IJWTManagerRepository
    {
        Tokens Authenticate(User users);
    }
}
