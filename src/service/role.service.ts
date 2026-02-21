import { IRoleService } from "../interfaces/role.service.interface";
import { IRoleRepository } from "../interfaces/role.repository.interface";
import { RoleResponseDTO } from "../models/DTOs/role.response.DTO";
import { CreateRoleDTO } from "../models/DTOs/role.create.DTO";
import { RoleUpdatedDTO } from "../models/DTOs/role.update.DTO";
import { Role } from "../models/entities/role.entity";

export class RoleService implements IRoleService{

    constructor(
        private readonly _repo:IRoleRepository
    ){
        
    }
    async getAllRoles(): Promise<RoleResponseDTO[] | null> {
        const roles=await this._repo.getAllRoles();

        if(!roles || roles.length===0){
            return null;
        }

        return roles.map(role=> this.mapRoleResponse(role));
    }
    async getRoleById(id: number): Promise<RoleResponseDTO | null> {
        const role=await this._repo.getRoleById(id);
        if(!role){
            return null;
        }

        return this.mapRoleResponse(role);

    }
    async createRole(data: CreateRoleDTO): Promise<RoleResponseDTO> {
        const role=new Role()

        role.name=data.name;
        if(data.description){
            role.description=data.description;
        }

        const newRole=await this._repo.createRole(role);
        if(!newRole){
            throw new Error("Error creating role");
        }

        return this.mapRoleResponse(newRole);
        
    }
    async updateRole(id: number, data: RoleUpdatedDTO): Promise<RoleResponseDTO | null> {
        const role=await this._repo.getRoleById(id);
        if(!role){
            return null;
        }

        if(data.name){
            role.name=data.name;
        }

        if(data.description){
            role.description=data.description;
        }

        const roleUpdated=await this._repo.updateRole(id,role);
        if(!roleUpdated){
            throw new Error("Error updating role");
        }

        return this.mapRoleResponse(roleUpdated);


    }
    async deleteRole(id: number): Promise<boolean> {
        const role=await this._repo.getRoleById(id);
        if(!role){
            return false;
        }

        await this._repo.deleteRole(id);
        return true;
    }

    private mapRoleResponse(data:Role): RoleResponseDTO{
        return {
            id:data.id,
            name:data.name,
            description:data.description ? 'no hay descripcion' : data.description
        }
    }
}