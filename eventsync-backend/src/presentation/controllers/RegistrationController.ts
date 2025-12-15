// src/presentation/controllers/RegistrationController.ts
import { Request, Response } from "express";
import { PrismaRegistrationRepository } from "../../persistence/repositories/PrismaRegistrationRepository";
import { PrismaEventRepository } from "../../persistence/repositories/PrismaEventRepository";
import { PrismaCheckinRepository } from "../../persistence/repositories/PrismaCheckinRepository";
import { RegisterForEventUseCase } from "../../application/usecases/RegisterForEventUseCase";
import { ManageRegistrationUseCase } from "../../application/usecases/ManageRegistrationUseCase";
import { PerformCheckinUseCase } from "../../application/usecases/PerformCheckinUseCase";
import { ConfirmPaymentUseCase } from "../../application/usecases/ConfirmPaymentUseCase";

export class RegistrationController {
  
  // INSCREVER-SE
  async create(req: Request, res: Response) {
      const { id } = req.params; 
      // @ts-ignore
      const userId = req.user.id; 

      try {
        const registrationRepo = new PrismaRegistrationRepository();
        const eventRepo = new PrismaEventRepository();
        const useCase = new RegisterForEventUseCase(registrationRepo, eventRepo);
        
        const result = await useCase.execute({ userId, eventId: id as string });
        return res.status(201).json(result);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
  }

  // 1. Listar inscritos de um evento
  async listByEvent(req: Request, res: Response) {
    const { id } = req.params; 
    const repo = new PrismaRegistrationRepository();
    
    // CORREÇÃO: as string
    const registrations = await repo.findAllByEvent(id as string);
    return res.json(registrations);
  }

  // 2. Aprovar/Recusar Inscrição
  async updateStatus(req: Request, res: Response) {
    const { id } = req.params; 
    const { status } = req.body; 
    // @ts-ignore
    const requesterId = req.user.id;

    const repo = new PrismaRegistrationRepository();
    const useCase = new ManageRegistrationUseCase(repo);

    try {
      // CORREÇÃO: as string
      const result = await useCase.execute(id as string, status, requesterId);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 3. Fazer Check-in
  async checkIn(req: Request, res: Response) {
    const { id } = req.params; 
    
    const checkinRepo = new PrismaCheckinRepository();
    const registrationRepo = new PrismaRegistrationRepository();
    const useCase = new PerformCheckinUseCase(checkinRepo, registrationRepo);

    try {
      // CORREÇÃO: as string
      const result = await useCase.execute(id as string);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 4. Confimar Pagamento
  async confirmPayment(req: Request, res: Response) {
    const { id } = req.params; // Registration ID
    // @ts-ignore
    const organizerId = req.user.id;

    const repo = new PrismaRegistrationRepository();
    const useCase = new ConfirmPaymentUseCase(repo);

    try {
      const result = await useCase.execute(id as string, organizerId);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}