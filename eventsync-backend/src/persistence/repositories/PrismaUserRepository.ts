// src/persistence/repositories/PrismaUserRepository.ts
import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ 
      where: { email } 
    });
  }

  async create(data: any): Promise<User> {
    return prisma.user.create({ 
      data 
    });
  }
  
  async findById(id: string): Promise<User | null> {
      return prisma.user.findUnique({ 
        where: { id } 
      });
  }
}