import { LoginDTO } from "../models/DTOs/login.DTO";
import { SessionDTO } from "../models/DTOs/session.DTO";
import { UserCreateDTO } from "../models/DTOs/user.create.DTO";
import { UserResponseDTO } from "../models/DTOs/user.response.DTO";
import { UserUpdateDTO } from "../models/DTOs/user.update.DTO";

export interface IUserService{
    register(data:UserCreateDTO) : Promise<UserResponseDTO | null>;
    loginEmail(data:LoginDTO) : Promise<SessionDTO | null>;
    getAllUsers() : Promise<UserResponseDTO[]>;
    getUserById(id: number) : Promise<UserResponseDTO | null>;
    deleteUser(id: number) : Promise<void>;
    updateUser(id: number, data: UserUpdateDTO) : Promise<UserResponseDTO | null>;
}