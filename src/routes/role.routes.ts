import { roleController } from "../containers/role.container";
import { Router } from "express";
import { auth } from "../containers/user.container";

const router=Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints related to role operations
 *
 * components:
 *   schemas:
 *     CreateRoleDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - name
 *
 *     RoleResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *
 *     RoleUpdatedDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /roles/getAllRoles:
 *   get:
 *     summary: Retrieve all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResponseDTO'
 */
router.get("/getAllRoles",roleController.getAllRoles);

/**
 * @swagger
 * /roles/getRoleById/{id}:
 *   get:
 *     summary: Get a role by its id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponseDTO'
 *       404:
 *         description: Role not found
 *       401:
 *         description: Unauthorized
 */
router.get("/getRoleById/:id",auth,roleController.getRoleById);

/**
 * @swagger
 * /roles/createRole:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleDTO'
 *     responses:
 *       201:
 *         description: Role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponseDTO'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post("/createRole",roleController.createRole);

/**
 * @swagger
 * /roles/updateRole/{id}:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdatedDTO'
 *     responses:
 *       200:
 *         description: Role updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponseDTO'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Role not found
 */
router.put("/updateRole/:id",auth,roleController.updateRole);

/**
 * @swagger
 * /roles/deleteRole/{id}:
 *   delete:
 *     summary: Delete a role by id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
router.delete("/deleteRole/:id",auth,roleController.deleteRole);

export default router;