import { RoleResponseDTO } from "../models/DTOs/role.response.DTO";
import { CreateRoleDTO } from "../models/DTOs/role.create.DTO";
import { RoleUpdatedDTO } from "../models/DTOs/role.update.DTO";

export interface IRoleService{
    getAllRoles() : Promise<RoleResponseDTO[] | null>;
    getRoleById(id:number) : Promise<RoleResponseDTO | null>;
    createRole(data:CreateRoleDTO) : Promise<RoleResponseDTO>;
    updateRole(id:number, data:RoleUpdatedDTO) : Promise<RoleResponseDTO | null>;
    deleteRole(id:number) : Promise<boolean>;
}