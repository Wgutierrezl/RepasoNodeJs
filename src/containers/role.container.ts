import { RoleRepository } from "../repository/role.repository";
import { RoleService } from "../service/role.service";
import { RoleController } from "../controllers/role.controller";

const roleRepository=new RoleRepository();
const roleService=new RoleService(roleRepository);

const roleController=new RoleController(roleService);

export {
    roleController
}