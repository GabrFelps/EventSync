import { PrismaClient, Checkin } from "@prisma/client";
import { ICheckinRepository } from "../../domain/repositories/ICheckinRepository";

const prisma = new PrismaClient();

export class PrismaCheckinRepository implements ICheckinRepository {
  async create(data: any): Promise<Checkin> {
    // Cria o checkin E incrementa o contador na inscrição (transação atômica)
    const [checkin] = await prisma.$transaction([
      prisma.checkin.create({ data }),
      prisma.registration.update({
        where: { id: data.registration_id },
        data: { checkins_count: { increment: 1 } }
      })
    ]);
    return checkin;
  }

  async countByRegistration(registrationId: string): Promise<number> {
    return prisma.checkin.count({ where: { registration_id: registrationId } });
  }
}