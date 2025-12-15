// src/application/usecases/CreateEventUseCase.ts
import { IEventRepository } from "../../domain/repositories/IEventRepository";

export class CreateEventUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(data: any) {
    const event = await this.eventRepository.create({
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      organizer_id: data.organizer_id,
      
      // Campos padrão
      status: "published", 
      price: 0,
      is_free: true,
      requires_approval: false,
      allowed_checkins: 1
    });
    
    return event;
  }
}