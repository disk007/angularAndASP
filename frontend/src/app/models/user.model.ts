export interface Permission {
    permissionId: string;
    permissionName: string;
  }
  
  export interface Role {
    roleId: string;
    roleName: string;
  }
  
  export interface User {
    userId: string;
    fristname: string;
    lastname: string;
    email: string;
    phone: string;
    create_at: Date;
    role: Role;
    username: string;
    permissions: Permission;
  }
  