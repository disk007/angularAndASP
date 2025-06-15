using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security;

namespace backend.Model.Domain
{
  public class Role
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int roleId { get; set; }
    public string roleName { get; set; }
    public string permissionName { get; set; }
  }
}
