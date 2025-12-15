// src/presentation/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login); 

export { authRoutes };