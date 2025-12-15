// src/persistence/repositories/PrismaEventRepository.ts
import { PrismaClient, Event } from "@prisma/client";
import { IEventRepository } from "../../domain/repositories/IEventRepository";

const prisma = new PrismaClient();

export class PrismaEventRepository implements IEventRepository {
  
  // ... métodos create e findAll que já existem ...
  async create(data: any): Promise<Event> {
    return prisma.event.create({ data });
  }

  async findAll(): Promise<Event[]> {
    return prisma.event.findMany({
      orderBy: { start_date: 'asc' },
      include: { organizer: { select: { name: true } } }
    });
  }

  async findById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: { id },
      // Trazemos dados do organizador para mostrar na tela de detalhes
      include: { organizer: { select: { name: true, email: true } } }
    });
  }
}