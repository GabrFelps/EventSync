// src/application/usecases/GetEventDetailsUseCase.ts
import { IEventRepository } from "../../domain/repositories/IEventRepository";

export class GetEventDetailsUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute(eventId: string) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }
}