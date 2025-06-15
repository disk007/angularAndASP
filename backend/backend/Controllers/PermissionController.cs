using backend.Data;
using backend.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PermissionController : ControllerBase
  {
    private readonly DBContextcs dbContextcs;

    public PermissionController(DBContextcs dbContextcs)
    {
      this.dbContextcs = dbContextcs;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllPermission()
    {
      var permissions = await dbContextcs.Roles.ToListAsync();
      var response = new List<ResPermissionDTO>();
      foreach (var data in permissions)
      {
        response.Add(new ResPermissionDTO
        {
          permissionId = data.roleId,
          permissionName = data.permissionName,
        });
      }
      return Ok(response);
    }
  }
}
