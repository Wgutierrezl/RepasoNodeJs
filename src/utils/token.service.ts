import { UserResponseDTO } from "../models/DTOs/user.response.DTO";
import { ITokenService } from "./token.service.interface";
import jwt , {SignOptions}from "jsonwebtoken";

export class TokenService implements ITokenService {

    verifyToken(token: string) {
        const secrets=process.env.JWT_SECRET
        if(!secrets){
            throw new Error("JWT_SECRET must be defined in .env file");
        }
        try{
            const decoded=jwt.verify(token,secrets);
            return decoded;
        }catch(error:any){
            throw new Error("Invalid token");
        }
    }

    generateToken(data: UserResponseDTO): string {
        const payload={
            id:data.id,
            email:data.email,
            username:data.username,
            role:data.role.name       
        }

        const secrets=process.env.JWT_SECRET
        const expiresIn=process.env.JWT_EXPIRES_IN

        if(!secrets || !expiresIn){
            throw new Error("JWT_SECRET and JWT_EXPIRES_IN must be defined in .env file");
        }

        const token=jwt.sign(payload,secrets,{
            expiresIn:expiresIn
        } as SignOptions);

        return token;
    }
    
}