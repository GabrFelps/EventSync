import { PrismaClient, Friendship, Message, User } from "@prisma/client";
import { IFriendshipRepository, IMessageRepository } from "../../domain/repositories/ISocialRepository";

const prisma = new PrismaClient();

export class PrismaFriendshipRepository implements IFriendshipRepository {
  async create(requesterId: string, recipientId: string): Promise<Friendship> {
    return prisma.friendship.create({
      data: { requester_id: requesterId, recipient_id: recipientId, status: "pending" }
    });
  }

  async find(userId1: string, userId2: string): Promise<Friendship | null> {
    return prisma.friendship.findFirst({
      where: {
        OR: [
          { requester_id: userId1, recipient_id: userId2 },
          { requester_id: userId2, recipient_id: userId1 }
        ]
      }
    });
  }

  async findById(id: string): Promise<Friendship | null> {
    return prisma.friendship.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: string): Promise<Friendship> {
    return prisma.friendship.update({ where: { id }, data: { status } });
  }

  async listFriends(userId: string): Promise<User[]> {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ requester_id: userId }, { recipient_id: userId }],
        status: "accepted"
      },
      include: { requester: true, recipient: true }
    });

    // Filtra para retornar apenas o "outro" usuário
    return friendships.map(f => f.requester_id === userId ? f.recipient : f.requester);
  }
}

export class PrismaMessageRepository implements IMessageRepository {
  async create(data: any): Promise<Message> {
    return prisma.message.create({ data });
  }

  async listConversation(userA: string, userB: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        OR: [
          { sender_id: userA, recipient_id: userB },
          { sender_id: userB, recipient_id: userA }
        ]
      },
      orderBy: { timestamp: 'asc' }
    });
  }
}