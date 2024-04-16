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

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(UserDto userDto)
        {
            var result = await _userService.RegisterUserService(userDto);
            return result;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> LoginUser(UserDto userDto)
        {
            try
            {
                var result = await _userService.LoginUserService(userDto);
                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
