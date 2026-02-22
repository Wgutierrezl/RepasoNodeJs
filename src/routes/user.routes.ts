import { Router } from "express";
import { userController, auth } from "../containers/user.container";
import { authMiddleware } from "../middlewares/auth.middleware";

const router=Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user operations
 *
 * components:
 *   schemas:
 *     UserCreateDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         roleId:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *       required:
 *         - username
 *         - roleId
 *         - email
 *         - password
 *
 *     LoginDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *       required:
 *         - email
 *         - password
 *
 *     UserResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           $ref: '#/components/schemas/RoleResponseDTO'
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     SessionDTO:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         userId:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *
 *     UserUpdateDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         roleId:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       201:
 *         description: Created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       400:
 *         description: Error registering user
 */
router.post("/register",userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user and return session token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionDTO'
 *       400:
 *         description: Invalid credentials
 */
router.post("/login",userController.login);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       401:
 *         description: Unauthorized
 */
router.get("/profile",auth,userController.getProfile);

/**
 * @swagger
 * /users/updateProfile:
 *   put:
 *     summary: Update authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateDTO'
 *     responses:
 *       200:
 *         description: Updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       400:
 *         description: Invalid request or missing token
 *       401:
 *         description: Unauthorized
 */
router.put("/updateProfile",auth,userController.updateProfile);

export default router;
