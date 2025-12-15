import { Review, Certificate, Event, Registration } from "@prisma/client";

export interface IFeedbackRepository {
  // Review
  createReview(data: any): Promise<Review>;
  findReview(userId: string, eventId: string): Promise<Review | null>;
  
  // Certificate
  createCertificate(data: any): Promise<Certificate>;
  findCertificate(userId: string, eventId: string): Promise<Certificate | null>;

  // Auxiliar
  findEventAndRegistration(userId: string, eventId: string): Promise<{ event: Event, registration: Registration } | null>;
}