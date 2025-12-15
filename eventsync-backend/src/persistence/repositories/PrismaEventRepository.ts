import { PrismaClient, Event } from "@prisma/client";
import { IEventRepository } from "../../domain/repositories/IEventRepository";

const prisma = new PrismaClient();

export class PrismaEventRepository implements IEventRepository {
  async create(data: any): Promise<Event> {
    return prisma.event.create({ data });
  }

  // <--- Método novo: Busca tudo
  async findAll(): Promise<Event[]> {
    return prisma.event.findMany({
      orderBy: { start_date: 'asc' }, // Ordena por data (opcional, mas bom)
      include: { organizer: { select: { name: true } } } // Traz o nome do dono
    });
  }
}