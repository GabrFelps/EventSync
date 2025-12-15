// src/domain/repositories/IUserRepository.ts
import { User } from "@prisma/client"; // Se der erro aqui, me avise (pode ser o local do generate)

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: any): Promise<User>;
  findById(id: string): Promise<User | null>;
}