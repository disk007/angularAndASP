namespace backend.Model.DTO
{
  public class CreateUserReqDTO
  {
    public string userId { get; set; }
    public string fristname { get; set; }
    public string lastname { get; set; }
    public string email { get; set; }
    public int roleId { get; set; }
    public string phone { get; set; }
    public DateTime create_at { get; set; }
    public string password { get; set; }
    public string username { get; set; }
  }
}
