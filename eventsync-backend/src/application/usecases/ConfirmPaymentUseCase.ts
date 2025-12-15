import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";

export class ConfirmPaymentUseCase {
  constructor(private registrationRepository: IRegistrationRepository) {}

  async execute(registrationId: string, organizerId: string) {
    const registration = await this.registrationRepository.findById(registrationId);
    
    if (!registration) throw new Error("Registration not found");
    // @ts-ignore
    if (registration.event.organizer_id !== organizerId) {
       throw new Error("Only the organizer can confirm payments");
    }

    if (registration.status !== "waiting_payment") {
      throw new Error("Registration is not waiting for payment");
    }

    // Após pagar, vira 'confirmed' ou 'approved'
    return this.registrationRepository.updateStatus(registrationId, "approved");
  }
}