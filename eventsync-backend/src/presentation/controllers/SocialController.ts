// src/presentation/controllers/SocialController.ts
import { Request, Response } from "express";
import { PrismaFriendshipRepository, PrismaMessageRepository } from "../../persistence/repositories/PrismaSocialRepository";
import { SendFriendRequestUseCase } from "../../application/usecases/SendFriendRequestUseCase";
import { RespondFriendRequestUseCase } from "../../application/usecases/RespondFriendRequestUseCase";
import { SendMessageUseCase } from "../../application/usecases/SendMessageUseCase";

export class SocialController {
  
  // 1. Enviar Pedido
  async sendRequest(req: Request, res: Response) {
    // @ts-ignore
    const requesterId = req.user.id;
    const { recipientId } = req.body;

    const repo = new PrismaFriendshipRepository();
    const useCase = new SendFriendRequestUseCase(repo);

    try {
      const result = await useCase.execute(requesterId, recipientId);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 2. Responder Pedido (Aceitar/Recusar)
  async respondRequest(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params; 
    const { action } = req.body; 

    const repo = new PrismaFriendshipRepository();
    const useCase = new RespondFriendRequestUseCase(repo);

    try {
      // CORREÇÃO: "as string"
      const result = await useCase.execute(id as string, userId, action);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 3. Listar Amigos
  async listFriends(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user.id;
    const repo = new PrismaFriendshipRepository();
    const friends = await repo.listFriends(userId);
    return res.json(friends);
  }

  // 4. Enviar Mensagem
  async sendMessage(req: Request, res: Response) {
    // @ts-ignore
    const senderId = req.user.id;
    const { recipientId, content } = req.body;

    const msgRepo = new PrismaMessageRepository();
    const friendRepo = new PrismaFriendshipRepository();
    const useCase = new SendMessageUseCase(msgRepo, friendRepo);

    try {
      const result = await useCase.execute(senderId, recipientId, content);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // 5. Ver Conversa
  async listMessages(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user.id;
    const { friendId } = req.params;

    const repo = new PrismaMessageRepository();
    // CORREÇÃO: "as string" no friendId também
    const msgs = await repo.listConversation(userId, friendId as string);
    return res.json(msgs);
  }
}