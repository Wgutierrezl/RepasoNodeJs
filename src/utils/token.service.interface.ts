import { UserResponseDTO } from "../models/DTOs/user.response.DTO";

export interface ITokenService {
    generateToken(data:UserResponseDTO) : string;
    verifyToken(token:string) : any;
}