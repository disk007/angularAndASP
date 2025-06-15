using backend.Data;
using backend.Model.Domain;
using backend.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RoleController : ControllerBase
  {
    private readonly DBContextcs dbContextcs;

    public RoleController(DBContextcs dbContextcs)
    {
      this.dbContextcs = dbContextcs;
    }
    [HttpPost]
    public async Task<IActionResult> CreateRole(CreateRoleDTO request)
    {
      var role = new Role
      {
        roleName = request.roleName,
        permissionName = request.permissionName,
      };

      await dbContextcs.Roles.AddAsync(role);
      await dbContextcs.SaveChangesAsync();

      return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
      var roles = await dbContextcs.Roles.ToListAsync();
      var response = new List<ResRoleDTO>();
      foreach (var data in roles)
      {
        response.Add(new ResRoleDTO
        {
          roleId = data.roleId,
          roleName = data.roleName,
        });
      }
      return Ok(response);
    }
  }
}
