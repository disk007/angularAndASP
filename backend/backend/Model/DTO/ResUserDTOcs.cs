namespace backend.Model.DTO
{
  public class UserResDTO
  {
    public string userId { get; set; }
    public string fristname { get; set; }
    public string lastname { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string username { get; set; }
    public DateTime create_at { get; set; }
    public ResRoleDTO role { get; set; }
    public ResPermissionDTO permission { get; set; }
  }
}
