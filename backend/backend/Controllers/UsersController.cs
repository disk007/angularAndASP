using backend.Data;
using backend.Model.Domain;
using backend.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly DBContextcs dbContextcs;

    public UsersController(DBContextcs dbContextcs)
    {
      this.dbContextcs = dbContextcs;
    }
    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserReqDTO request)
    {
      var hasher = new PasswordHasher<string>();
      var user = new User
      {
        userId = request.userId,
        fristname = request.fristname,
        lastname = request.lastname,
        email = request.email,
        phone = request.phone,
        create_at = DateTime.UtcNow,
        roleId = request.roleId,
        username = request.username,
        password = hasher.HashPassword(null, request.password)
      };

      await dbContextcs.Users.AddAsync(user);
      await dbContextcs.SaveChangesAsync();

      return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
      var users = await dbContextcs.Users
        .Include(u => u.Role)
        .ToListAsync();
      var response = new List<UserResDTO>();
      TimeZoneInfo thaiTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
      foreach (var data in users)
      {
        response.Add(new UserResDTO
        {
          userId = data.userId,
          fristname = data.fristname,
          lastname = data.lastname,
          email = data.email,
          phone = data.phone,
          username = data.username,
          create_at = TimeZoneInfo.ConvertTimeFromUtc(data.create_at, thaiTimeZone),

          role = new ResRoleDTO
          {
            roleId = data.roleId,
            roleName = data.Role.roleName,
          },
          permission = new ResPermissionDTO
          {
            permissionId = data.roleId,
            permissionName = data.Role.permissionName,
          }
        });
      }
      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
      var user = await dbContextcs.Users
          .Include(u => u.Role) 
          .FirstOrDefaultAsync(u => u.userId == id);

      if (user == null)
      {
        return NotFound();
      }

      var response = new UserResDTO
      {
        userId = user.userId,
        fristname = user.fristname,
        lastname = user.lastname,
        email = user.email,
        phone = user.phone,
        username = user.username,

        role = new ResRoleDTO
        {
          roleId = user.roleId,
          roleName = user.Role?.roleName
        },
        permission = new ResPermissionDTO
        {
          permissionId = user.roleId, 
          permissionName = user.Role?.permissionName
        }
      };

      return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditUser(string id, UpdateUserDTO request)
    {
      var hasher = new PasswordHasher<string>();
      var user = new UpdateUserDTO
      {
        fristname = request.fristname,
        lastname = request.lastname,
        email = request.email,
        phone = request.phone,
        roleId = request.roleId,
        create_at = DateTime.UtcNow,
        username = request.username,
      };
      var exisingUser = await dbContextcs.Users.FirstOrDefaultAsync(x => x.userId == id);
      if (exisingUser != null)
      {
        dbContextcs.Entry(exisingUser).CurrentValues.SetValues(user);
        await dbContextcs.SaveChangesAsync();
        return Ok();
      }
      return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
      var existingUser = await dbContextcs.Users.FirstOrDefaultAsync(x => x.userId == id);
      if(existingUser is null)
      {
        return null;
      }

      dbContextcs.Users.Remove(existingUser);
      await dbContextcs.SaveChangesAsync();
      return Ok();
    }
  }
}
