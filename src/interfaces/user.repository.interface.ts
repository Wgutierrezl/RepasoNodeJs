import { User } from "../models/entities/user.entity";

export interface IUserRepository {
    createUser(data:User) : Promise<User>;
    findByEmail(email: string) : Promise<User | null>;
    findById(id: number) : Promise<User | null>;
    getAllUsers() : Promise<User[]>;
    deleteUser(id: number) : Promise<void>;
    updateUser(id: number, data: Partial<User>) : Promise<User>;
}