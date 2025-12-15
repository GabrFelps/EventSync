// src/presentation/controllers/EventController.ts
import { Request, Response } from "express";
import { PrismaEventRepository } from "../../persistence/repositories/PrismaEventRepository";
import { CreateEventUseCase } from "../../application/usecases/CreateEventUseCase";
import { ListEventsUseCase } from "../../application/usecases/ListEventsUseCase";
import { GetEventDetailsUseCase } from "../../application/usecases/GetEventDetailsUseCase"; // <--- Importante!

export class EventController {
  
  // 1. CRIAR
  async create(req: Request, res: Response) {
    const { title, description, start_date, end_date } = req.body;
    // @ts-ignore
    const organizer_id = req.user.id; 

    const eventRepository = new PrismaEventRepository();
    const createEventUseCase = new CreateEventUseCase(eventRepository);

    try {
        const event = await createEventUseCase.execute({
        title,
        description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        organizer_id,
        });

        return res.status(201).json(event);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
  }

  // 2. LISTAR TODOS
  async list(req: Request, res: Response) {
    const eventRepository = new PrismaEventRepository();
    const listEventsUseCase = new ListEventsUseCase(eventRepository);

    const events = await listEventsUseCase.execute();

    return res.json(events);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const eventRepository = new PrismaEventRepository();
    const getEventDetailsUseCase = new GetEventDetailsUseCase(eventRepository);

    try {
      // Usamos "as string" para garantir
      const event = await getEventDetailsUseCase.execute(id as string);
      return res.json(event);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}