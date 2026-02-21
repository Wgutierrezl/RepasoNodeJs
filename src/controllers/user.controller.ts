import { Request,Response } from "express";
import { AppDataSource } from "../config/config.db";
import { IUserService } from "../interfaces/user.service.interface";
import { UserCreateDTO } from "../models/DTOs/user.create.DTO";
import { LoginDTO } from "../models/DTOs/login.DTO";
import { AuthRequest } from "../middlewares/auth.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserUpdateDTO } from "../models/DTOs/user.update.DTO";

export class UserController {


    constructor(
        private readonly _service:IUserService
    ){}

    register=async(req:Request,res:Response): Promise<Response> =>{

        try{
            const dto:UserCreateDTO=req.body;
            const userRegister=await this._service.register(dto);
            if(!userRegister){
                return res.status(400).json({ message: "Error registering user" });
            }
            return res.status(201).json(userRegister);

        }catch(error: any){
            return res.status(500).json({ message: "Error registering user", error: error.message });
        }
    }


    login=async(req:Request, res:Response): Promise<Response> => {
        try{
            const dto:LoginDTO=req.body;
            const userLogin=await this._service.loginEmail(dto);
            if(!userLogin){
                return res.status(400).json({ message: "Invalid email or password" });
            }

            return res.status(200).json(userLogin);

        }catch(error:any){
            return res.status(500).json({ message: "Error logging in", error: error.message });

        }
    }

    getProfile=async(req:AuthRequest, res:Response) : Promise<Response> => {
        try{
            const userId=req.user.id;
            if(!userId){
                return res.status(400).json({ message: "User ID not found in token" });
            }

            const userProfile=await this._service.getUserById(userId);
            if(!userProfile){
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(userProfile);

        }catch(error:any){
            return res.status(500).json({ message: "Error getting profile", error: error.message });
        }
    }

    updateProfile=async(req:AuthRequest, res:Response) : Promise<Response> => {
        try{
            const userId=req.user.id;
            if(!userId){
                return res.status(400).json({ message: "User ID not found in token" });
            }
            const dto:UserUpdateDTO=req.body;

            const updatedProfile=await this._service.updateUser(userId,dto);
            if(!updatedProfile){
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(updatedProfile);


        }catch(error:any){
            return res.status(500).json({ message: "Error updating profile", error: error.message });
        }
    }





}