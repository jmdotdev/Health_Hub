using api.Data;
using api.DTO;
using api.Models;
using BCrypt.Net;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        private DataContext _dataContext;
        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> RegisterUserService(UserDto userDto)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            var user = new User
            {
                Email = userDto.Email,
                UserName = userDto.Name,
                Password = hashedPassword,
                Role = "Patient"
            };

            await _dataContext.Users.AddAsync(user);
          await _dataContext.SaveChangesAsync();
          return user;
        }
    }
}
