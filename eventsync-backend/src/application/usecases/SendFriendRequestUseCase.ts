import { IFriendshipRepository } from "../../domain/repositories/ISocialRepository";
import { PrismaClient } from "@prisma/client"; // Usando prisma direto pra checar evento comum (atalho pro MVP)

const prisma = new PrismaClient();

export class SendFriendRequestUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(requesterId: string, recipientId: string) {
    if (requesterId === recipientId) throw new Error("Cannot add yourself");

    // 1. Verificar se já existe amizade ou pedido
    const exists = await this.friendshipRepository.find(requesterId, recipientId);
    if (exists) throw new Error("Friendship request already sent or exists");

    // 2. REGRA DE OURO: Verificar se ambos têm inscrição APROVADA no mesmo evento
    // (Query complexa, usamos prisma direto para agilizar)
    const commonEvents = await prisma.registration.findMany({
      where: {
        user_id: requesterId,
        status: "approved",
        event: {
          registrations: {
            some: { user_id: recipientId, status: "approved" }
          }
        }
      }
    });

    if (commonEvents.length === 0) {
      throw new Error("You must share an event with this user to send a friend request");
    }

    // 3. Criar pedido
    return this.friendshipRepository.create(requesterId, recipientId);
  }
}