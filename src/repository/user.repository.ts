import { Repository } from "typeorm";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../models/entities/user.entity";
import { AppDataSource } from "../config/config.db";

export class UserRepository implements IUserRepository {

    private repo:Repository<User>;

    constructor() {
        this.repo = AppDataSource.getRepository(User);
    }
    async createUser(data: User): Promise<User> {
        return await this.repo.save(data);
    }
    async findByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({
            where: { 
                email: email 
            },
            relations:{
                role:true
            }
        }) as User | null;
    }
    async findById(id: number): Promise<User | null> {
        return await this.repo.findOne({
            where:{
                id:id
            },
            relations:{
                role:true
            }
        }) as User | null;
    }
    async getAllUsers(): Promise<User[]> {
        return await this.repo.find({
            relations:{
                role:true
            }
        }) as User[];
    }
    async deleteUser(id: number): Promise<void> {
        await this.repo.delete(id);
        return ;
    
    }
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        await this.repo.update(id, data);
        return await this.repo.findOne({
            where:{id},
            relations:{role:true}
        }) as User;
    }
    
}