import { IMessageRepository, IFriendshipRepository } from "../../domain/repositories/ISocialRepository";

export class SendMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private friendshipRepository: IFriendshipRepository
  ) {}

  async execute(senderId: string, recipientId: string, content: string) {
    // 1. Só pode mandar mensagem se forem amigos (status accepted)
    const friendship = await this.friendshipRepository.find(senderId, recipientId);
    
    if (!friendship || friendship.status !== "accepted") {
      throw new Error("You can only message friends");
    }

    // 2. Envia mensagem
    return this.messageRepository.create({
      sender_id: senderId,
      recipient_id: recipientId,
      content,
      tipo: "text" // ou 'avulsa' conforme schema
    });
  }
}