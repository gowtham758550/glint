import { Role } from "../enums/role.enum";

export interface Claims {
    UserId: number,
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': Role,
    Email: string,
    UserName: string
}