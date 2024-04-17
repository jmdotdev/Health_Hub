using api.DTO;
using api.Models;

namespace api.Services.UserService
{
    public interface IUserService
    {
        Task<User> RegisterUserService(UserDto userDto);
        Task<string> LoginUserService(UserDto userDto);
    }
}
