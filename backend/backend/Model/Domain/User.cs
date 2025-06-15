using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.Domain
{
  public class User
  {
    [Required]
    public string userId { get; set; }
    [Required]
    public string fristname { get; set; }
    [Required]
    public string lastname { get; set; }
    [Required]
    public string email { get; set; }
    [Required]
    public string username { get; set; }
    [Required]
    public string phone { get; set; }
    [Required]
    public int roleId { get; set; }
    public DateTime create_at { get; set; }
    public string password { get; set; }
    public Role Role { get; set; }
  }
}
