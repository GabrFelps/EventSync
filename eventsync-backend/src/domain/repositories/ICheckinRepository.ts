import { Checkin } from "@prisma/client";

export interface ICheckinRepository {
  create(data: any): Promise<Checkin>;
  countByRegistration(registrationId: string): Promise<number>;
}