// src/domain/repositories/IEventRepository.ts
import { Event } from "@prisma/client";

export interface IEventRepository {
  create(data: any): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>; 
}