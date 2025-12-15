// src/application/usecases/LoginUserUseCase.ts
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import authConfig from "../../shared/config/auth";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: any) {
    // 1. Verificar se usuário existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect.");
    }

    // 2. Verificar se a senha bate
    const passwordMatched = await compare(password, user.password_hash);
    if (!passwordMatched) {
      throw new Error("Email or password incorrect.");
    }

    // 3. Gerar Token JWT
    const token = sign({}, authConfig.secret as string, {
      subject: user.id,
      expiresIn: authConfig.expiresIn as any,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}