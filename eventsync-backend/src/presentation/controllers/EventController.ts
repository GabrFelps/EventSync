import { Request, Response } from "express";
import { PrismaEventRepository } from "../../persistence/repositories/PrismaEventRepository";
import { CreateEventUseCase } from "../../application/usecases/CreateEventUseCase";
import { ListEventsUseCase } from "../../application/usecases/ListEventsUseCase"; // <--- Import novo

export class EventController {
  
  // Método de CRIAR (Mantive igual)
  async create(req: Request, res: Response) {
    const { title, description, start_date, end_date } = req.body;
    // @ts-ignore
    const organizer_id = req.user.id; 

    const eventRepository = new PrismaEventRepository();
    const createEventUseCase = new CreateEventUseCase(eventRepository);

    const event = await createEventUseCase.execute({
      title,
      description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      organizer_id,
    });

    return res.status(201).json(event);
  }

  // <--- Método NOVO: LISTAR
  async list(req: Request, res: Response) {
    const eventRepository = new PrismaEventRepository();
    const listEventsUseCase = new ListEventsUseCase(eventRepository);

    const events = await listEventsUseCase.execute();

    return res.json(events);
  }
}