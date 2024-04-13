using api.DTO;
using api.Models;
using api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser(UserDto userDto)
        {
            var result = await _userService.RegisterUserService(userDto);
            return result;
        }
    }
}
