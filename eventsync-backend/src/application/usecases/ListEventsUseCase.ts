import { IEventRepository } from "../../domain/repositories/IEventRepository";

export class ListEventsUseCase {
  constructor(private eventRepository: IEventRepository) {}

  async execute() {
    const events = await this.eventRepository.findAll();
    return events;
  }
}