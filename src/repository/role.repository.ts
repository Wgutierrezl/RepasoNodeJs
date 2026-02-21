import { Repository } from "typeorm";
import { IRoleRepository } from "../interfaces/role.repository.interface";
import { Role } from "../models/entities/role.entity";
import { AppDataSource } from "../config/config.db";

export class RoleRepository implements IRoleRepository{

    private readonly repo:Repository<Role>;
    constructor(){
        this.repo=AppDataSource.getRepository(Role);
    }

    async getAllRoles(): Promise<Role[]> {
        return await this.repo.find()
    }
    async getRoleById(id: number): Promise<Role | null> {
        return await this.repo.findOneBy({id:id})
    }
    async createRole(data: Role): Promise<Role> {
        return await this.repo.save(data)
    }
    async updateRole(id: number, data: Role): Promise<Role | null> {
        await this.repo.update(id,data);
        return await this.repo.findOneBy({id:id})
    }
    async deleteRole(id: number): Promise<void> {
        await this.repo.delete(id);
        return ;
    }
    
}