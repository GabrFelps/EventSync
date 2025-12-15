// src/presentation/controllers/AuthController.ts
import { Request, Response } from "express";
import { PrismaUserRepository } from "../../persistence/repositories/PrismaUserRepository";
import { RegisterUserUseCase } from "../../application/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/usecases/LoginUserUseCase"; // <--- Importe aqui

export class AuthController {
  
  // ... (o método register continua igual aqui em cima) ...
  async register(req: Request, res: Response) {
    // ... código antigo do register ...
    try {
        const userRepository = new PrismaUserRepository();
        const registerUserUseCase = new RegisterUserUseCase(userRepository);
        const user = await registerUserUseCase.execute(req.body);
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
  }

  // ADICIONE ESTE MÉTODO NOVO:
  async login(req: Request, res: Response) {
    try {
      const userRepository = new PrismaUserRepository();
      const loginUserUseCase = new LoginUserUseCase(userRepository);

      const { user, token } = await loginUserUseCase.execute(req.body);

      return res.json({ user, token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}