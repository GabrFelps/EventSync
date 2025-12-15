// src/application/usecases/RegisterForEventUseCase.ts
import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import { IEventRepository } from "../../domain/repositories/IEventRepository";

export class RegisterForEventUseCase {
  constructor(
    private registrationRepository: IRegistrationRepository,
    private eventRepository: IEventRepository
  ) {}

  async execute({ userId, eventId }: any) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new Error("Event not found");

    const alreadyRegistered = await this.registrationRepository.findByUserAndEvent(userId, eventId);
    if (alreadyRegistered) throw new Error("User already registered");

    // --- NOVA LÓGICA DE STATUS ---
    let initialStatus = "approved";

    if (!event.is_free && event.price > 0) {
      // Se é pago -> Aguardando Pagamento
      initialStatus = "waiting_payment";
    } else if (event.requires_approval) {
      // Se é grátis mas requer aprovação -> Pendente
      initialStatus = "pending";
    }
    // Se grátis e sem aprovação -> Approved (já definido)

    const registration = await this.registrationRepository.create({
      user_id: userId,
      event_id: eventId,
      status: initialStatus
    });

    // Retornamos também a chave pix e valor para o frontend mostrar
    return {
      ...registration,
      payment_info: initialStatus === "waiting_payment" ? {
        pix_key: (event as any).pix_key,
        value: event.price
      } : null
    };
  }
}