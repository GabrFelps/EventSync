import { IFriendshipRepository } from "../../domain/repositories/ISocialRepository";

export class RespondFriendRequestUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(requestId: string, userId: string, action: "accepted" | "rejected") {
    const request = await this.friendshipRepository.findById(requestId);

    if (!request) throw new Error("Request not found");
    if (request.recipient_id !== userId) throw new Error("Not authorized");

    return this.friendshipRepository.updateStatus(requestId, action);
  }
}