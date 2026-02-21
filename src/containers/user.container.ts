import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { TokenService } from "../utils/token.service";
import { HasherService } from "../utils/hasher.service";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRepository=new UserRepository();
const tokenService=new TokenService();
const hasherService=new HasherService();

const userService=new UserService(tokenService,hasherService,userRepository);

const auth=authMiddleware(tokenService);
const userController=new UserController(userService);

export {
    userController,
    auth
}
