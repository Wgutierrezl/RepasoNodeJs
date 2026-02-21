import { Request,Response, NextFunction } from "express";
import { ITokenService } from "../utils/token.service.interface";
import { TokenService } from "../utils/token.service";
import { Auth } from "typeorm";

export interface AuthRequest extends Request {
    user?:any
}

export const authMiddleware = (TokenService:ITokenService) => {
    return (req:AuthRequest, res:Response, next:NextFunction) => {
        try{
            const authHeader=req.headers.authorization;

            if(!authHeader){
                return res.status(401).json({ message: "Unauthorized" });
            }

            const [type,token]=authHeader.split(" ");

            if(type !== "Bearer" || !token){
                return res.status(401).json({ message: "Unauthorized" });
            }

            const decoded=TokenService.verifyToken(token);

            req.user=decoded;

            next();

        }catch(error:any){
            return res.status(401).json({ message: "Unauthorized", error: error.message });
        }
    }
}