import { Role } from "../models/entities/role.entity";

export interface IRoleRepository{
    getAllRoles() : Promise<Role[]>;
    getRoleById(id:number) : Promise<Role | null>;
    createRole(data:Role) : Promise<Role>;
    updateRole(id:number, data:Role) : Promise<Role | null>;
    deleteRole(id:number) : Promise<void>;
}