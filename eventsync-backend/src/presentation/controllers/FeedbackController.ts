import { Request, Response } from "express";
import { PrismaFeedbackRepository } from "../../persistence/repositories/PrismaFeedbackRepository";
import { RateEventUseCase } from "../../application/usecases/RateEventUseCase";
import { IssueCertificateUseCase } from "../../application/usecases/IssueCertificateUseCase";

export class FeedbackController {
  
  // POST /events/:id/reviews
  async createReview(req: Request, res: Response) {
    const { id } = req.params; // Event ID
    // @ts-ignore
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const repo = new PrismaFeedbackRepository();
    const useCase = new RateEventUseCase(repo);

    try {
      // "as string" para garantir
      const result = await useCase.execute(userId, id as string, rating, comment);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /events/:id/certificate
  async getCertificate(req: Request, res: Response) {
    const { id } = req.params; // Event ID
    // @ts-ignore
    const userId = req.user.id;

    const repo = new PrismaFeedbackRepository();
    const useCase = new IssueCertificateUseCase(repo);

    try {
      const result = await useCase.execute(userId, id as string);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}