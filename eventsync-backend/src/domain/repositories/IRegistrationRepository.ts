import { Registration } from "@prisma/client";

export interface IRegistrationRepository {
  create(data: any): Promise<Registration>;
  findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;
  // NOVOS MÉTODOS:
  findById(id: string): Promise<Registration | null>;
  findAllByEvent(eventId: string): Promise<Registration[]>;
  updateStatus(id: string, status: string): Promise<Registration>;
}