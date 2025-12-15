import { Event } from "@prisma/client";

export interface IEventRepository {
  create(data: any): Promise<Event>;
  findAll(): Promise<Event[]>; 
}