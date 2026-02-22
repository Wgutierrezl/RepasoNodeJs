import e from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeMiddleware = (allowedRoles:string[]) => {
    return (req:AuthRequest, res:e.Response, next:e.NextFunction) => {
        try{
            if(!req.user){
                return res.status(401).json({ message: "Unauthorized" });
            }

            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        }catch(error:any){
            return res.status(401).json({ message: "Unauthorized", error: error.message });
        }
    }
}