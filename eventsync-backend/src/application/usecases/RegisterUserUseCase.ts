// src/application/usecases/RegisterUserUseCase.ts
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { hash } from "bcryptjs"; 
export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: any) {
    // 1. Verificar se usuário já existe
    const userAlreadyExists = await this.userRepository.findByEmail(input.email);
    
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    // 2. Criptografar a senha (Hash)
    const passwordHash = await hash(input.password, 8);

    // 3. Criar usuário
    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password_hash: passwordHash,
      role: "user",
      city: input.city,
      visibility_participation: true
    });

    return user;
  }
}