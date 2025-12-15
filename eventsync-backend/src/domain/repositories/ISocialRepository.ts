import { Friendship, Message, User } from "@prisma/client";

export interface IFriendshipRepository {
  create(requesterId: string, recipientId: string): Promise<Friendship>;
  find(requesterId: string, recipientId: string): Promise<Friendship | null>;
  findById(id: string): Promise<Friendship | null>;
  updateStatus(id: string, status: string): Promise<Friendship>;
  listFriends(userId: string): Promise<User[]>;
}

export interface IMessageRepository {
  create(data: any): Promise<Message>;
  listConversation(userA: string, userB: string): Promise<Message[]>;
}