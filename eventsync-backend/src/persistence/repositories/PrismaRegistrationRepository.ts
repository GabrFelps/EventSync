import { PrismaClient, Registration } from "@prisma/client";
import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";

const prisma = new PrismaClient();

export class PrismaRegistrationRepository implements IRegistrationRepository {
  async create(data: any): Promise<Registration> {
    return prisma.registration.create({ data });
  }

  async findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null> {
    return prisma.registration.findFirst({
      where: { user_id: userId, event_id: eventId }
    });
  }

  // --- IMPLEMENTAÇÃO DOS NOVOS MÉTODOS ---
  
  async findById(id: string): Promise<Registration | null> {
    return prisma.registration.findUnique({
      where: { id },
      include: { user: true, event: true } // Já traz dados do usuário e evento
    });
  }

  async findAllByEvent(eventId: string): Promise<Registration[]> {
    return prisma.registration.findMany({
      where: { event_id: eventId },
      include: { user: { select: { id: true, name: true, email: true, city: true } } }
    });
  }

  async updateStatus(id: string, status: string): Promise<Registration> {
    return prisma.registration.update({
      where: { id },
      data: { status }
    });
  }
}