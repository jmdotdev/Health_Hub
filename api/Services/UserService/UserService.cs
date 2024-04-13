using api.Data;
using api.DTO;
using api.Models;

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
           var user = new User();
           user.Email = userDto.Email;
           user.UserName = userDto.Name;
           user.Password = userDto.Password;
           user.Role = "Patient";

          await _dataContext.Users.AddAsync(user);
          await _dataContext.SaveChangesAsync();
          return user;
        }
    }
}
