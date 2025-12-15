import { PrismaClient, Review, Certificate, Event, Registration } from "@prisma/client";
import { IFeedbackRepository } from "../../domain/repositories/IFeedbackRepository";

const prisma = new PrismaClient();

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async createReview(data: any): Promise<Review> {
    return prisma.review.create({ data });
  }

  async findReview(userId: string, eventId: string): Promise<Review | null> {
    return prisma.review.findFirst({ where: { user_id: userId, event_id: eventId } });
  }

  async createCertificate(data: any): Promise<Certificate> {
    return prisma.certificate.create({ data });
  }

  async findCertificate(userId: string, eventId: string): Promise<Certificate | null> {
    return prisma.certificate.findFirst({ where: { user_id: userId, event_id: eventId } });
  }

  // Busca Evento e Inscrição juntos para validar regras
  async findEventAndRegistration(userId: string, eventId: string): Promise<{ event: Event, registration: Registration } | null> {
    const registration = await prisma.registration.findFirst({
      where: { user_id: userId, event_id: eventId },
      include: { event: true }
    });

    if (!registration) return null;
    return { event: registration.event, registration };
  }
}