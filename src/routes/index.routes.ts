import userRoutes from "./user.routes";
import rolesRoutes from "./role.routes"
import { Router } from "express";

const router=Router();

router.use("/users",userRoutes);
router.use("/roles",rolesRoutes);

export default router;