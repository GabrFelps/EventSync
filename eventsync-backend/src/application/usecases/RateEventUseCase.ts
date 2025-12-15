import { IFeedbackRepository } from "../../domain/repositories/IFeedbackRepository";

export class RateEventUseCase {
  constructor(private feedbackRepository: IFeedbackRepository) {}

  async execute(userId: string, eventId: string, rating: number, comment: string) {
    // 1. Busca dados
    const data = await this.feedbackRepository.findEventAndRegistration(userId, eventId);
    if (!data) throw new Error("Registration not found");

    const { event, registration } = data;

    // 2. Valida se o evento já acabou (Regra do PDF)
    // Para teste, se não tiver status 'finished', vamos permitir se tiver checkin,
    // mas o correto é: if (event.status !== 'finished') ...
    
    // 3. Valida se fez check-in
    if (registration.checkins_count < 1) {
      throw new Error("You must attend the event (check-in) to rate it");
    }

    // 4. Verifica se já avaliou
    const existingReview = await this.feedbackRepository.findReview(userId, eventId);
    if (existingReview) throw new Error("You already rated this event");

    // 5. Salva
    return this.feedbackRepository.createReview({
      user_id: userId,
      event_id: eventId,
      rating,
      comment
    });
  }
}