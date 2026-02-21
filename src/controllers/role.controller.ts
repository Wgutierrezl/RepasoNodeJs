import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { IRoleService } from "../interfaces/role.service.interface";
import { CreateRoleDTO } from "../models/DTOs/role.create.DTO";
import { RoleUpdatedDTO } from "../models/DTOs/role.update.DTO";

export class RoleController{
    constructor(
        private readonly _service:IRoleService
    ){}

    getAllRoles=async(req:Request,res:Response): Promise<Response> => {
        try{
            const roles=await this._service.getAllRoles();
            if(!roles || roles.length===0){
                return res.status(404).json({ message: "No roles found" });
            }

            return res.status(200).json(roles);

        }catch(error:any){
            return res.status(500).json({ message: "Error getting roles", error: error.message });
        }
    }

    getRoleById=async(req:AuthRequest,res:Response): Promise<Response> => {
        try{
            const {id}=req.params;
            if(!id){
                return res.status(400).json({ message: "Role ID is required" });
            }

            const role=await this._service.getRoleById(Number(id));
            if(!role){
                return res.status(404).json({ message: "Role not found" });
            }

            return res.status(200).json(role);

        }catch(error:any){
            return res.status(500).json({ message: "Error getting role", error: error.message });
        }
    }

    createRole=async(req:AuthRequest, res:Response) : Promise<Response> => {
        try{
            const dto:CreateRoleDTO=req.body;
            const newRole=await this._service.createRole(dto);
            if(!newRole){
                return res.status(400).json({ message: "Error creating role" });
            }

            return res.status(201).json(newRole);

        }catch(error:any){
            return res.status(500).json({ message: "Error creating role", error: error.message });
        }
    }

    updateRole=async(req:AuthRequest,res:Response) : Promise<Response> => {
        try{
            const {id}=req.params;
            if(!id){
                return res.status(400).json({ message: "Role ID is required" });
            }

            const dto:RoleUpdatedDTO=req.body;
            const roleUpdated=await this._service.updateRole(Number(id),dto);
            if(!roleUpdated){
                return res.status(404).json({ message: "Role not found or error updating role" });
            }

            return res.status(200).json(roleUpdated);

        }catch(error:any){
            return res.status(500).json({ message: "Error updating role", error: error.message });
        }
    }

    deleteRole=async(req:AuthRequest, res:Response) : Promise<Response> => {
        try{
            const {id}=req.params;
            if(!id){
                return res.status(400).json({ message: "Role ID is required" });
            }
            const deleted=await this._service.deleteRole(Number(id));
            if(!deleted){
                return res.status(404).json({ message: "Role not found or error deleting role" });
            }
            return res.status(200).json({ message: "Role deleted successfully" });

        }catch(error:any){
            return res.status(500).json({ message: "Error deleting role", error: error.message });
        }
    }


}