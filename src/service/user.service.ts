import { IUserService } from "../interfaces/user.service.interface";
import { LoginDTO } from "../models/DTOs/login.DTO";
import { SessionDTO } from "../models/DTOs/session.DTO";
import { UserCreateDTO } from "../models/DTOs/user.create.DTO";
import { UserResponseDTO } from "../models/DTOs/user.response.DTO";
import { ITokenService } from "../utils/token.service.interface";
import { IHasherService } from "../utils/hasher.service.interface";
import { User } from "../models/entities/user.entity";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { UserUpdateDTO } from "../models/DTOs/user.update.DTO";

export class UserService implements IUserService{

    constructor(
        private readonly _tokenService: ITokenService, 
        private readonly _hasherService: IHasherService,
        private readonly _userRepository: IUserRepository
    ){}

    async getAllUsers(): Promise<UserResponseDTO[]> {
        const response=await this._userRepository.getAllUsers();
        if(!response){
            throw new Error("Error fetching users");
        }
        return response.map(user=>this.mapUserResponse(user));
    }

    async register(data: UserCreateDTO): Promise<UserResponseDTO | null> {

        const isUserExists=await this._userRepository.findByEmail(data.email);

        if(isUserExists){
            throw new Error("User already exists");
        }

        const userCreate=new User();

        userCreate.username=data.username;
        userCreate.email=data.email;
        userCreate.password=this._hasherService.hashPassword(data.password);
        userCreate.role={ id: data.roleId } as any;

        const user=await this._userRepository.createUser(userCreate);

        if(!user){
            throw new Error("Error creating user");
        }

        return this.mapUserResponse(user);

    }
    
    async loginEmail(data: LoginDTO): Promise<SessionDTO | null> {
        const user=await this._userRepository.findByEmail(data.email);
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isValidPassword=await this._hasherService.comparePassword(data.password,user.password);
        if(!isValidPassword){
            throw new Error("Invalid credentials");
        }

        const token=this._tokenService.generateToken(this.mapUserResponse(user));

        return this.mapSessionResponse(user,token);
    }

    async getUserById(id: number): Promise<UserResponseDTO | null> {
        const user=await this._userRepository.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return this.mapUserResponse(user);
    }

    async deleteUser(id: number): Promise<boolean> {
        const user=await this._userRepository.findById(id);
        if(!user){
            return false;
        }
        await this._userRepository.deleteUser(id);
        return true;
    }

    async updateUser(id: number, data: UserUpdateDTO): Promise<UserResponseDTO | null> {
        const user=await this._userRepository.findById(id);
        if(!user){
            throw new Error("User not found");
        }

        if(data.email){
            const isEmailTaken=await this._userRepository.findByEmail(data.email);
            if(isEmailTaken && isEmailTaken.id !== id){
                throw new Error("Email already in use");
            }
            user.email=data.email;
        }

        if(data.username){
            user.username=data.username;
        }

        if(data.password){
            user.password=this._hasherService.hashPassword(data.password);
        }

        if(data.roleId){
            user.role={ id: data.roleId } as any;
        }
        
        const updatedUser=await this._userRepository.updateUser(id,user);
        if(!updatedUser){
            throw new Error("Error updating user");
        }
        return this.mapUserResponse(updatedUser);
    }

    private mapUserResponse(data:User) : UserResponseDTO {
        return {
            id:data.id,
            username:data.username,
            email:data.email,
            isActive:data.isActive,
            createdAt:data.createdAt,
            role:{
                id:data.role.id,
                name:data.role.name,
                description:data.role.description
            }
        }
    }

    private mapSessionResponse(data:User, token: string) : SessionDTO {
        return {
            token:token,
            userId:data.id,
            email:data.email,
            role:data.role.name,
            username:data.username
        }
    }

}