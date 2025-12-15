import { ICheckinRepository } from "../../domain/repositories/ICheckinRepository";
import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";

export class PerformCheckinUseCase {
  constructor(
    private checkinRepository: ICheckinRepository,
    private registrationRepository: IRegistrationRepository
  ) {}

  async execute(registrationId: string) {
    // 1. Busca a inscrição
    const registration = await this.registrationRepository.findById(registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    // 2. Valida Status (Só entra se estiver aprovado ou confirmado)
    if (registration.status !== "approved" && registration.status !== "confirmed") {
      throw new Error("User not approved for this event");
    }

    // 3. Verifica limite de checkins (Regra do PDF pg 8)
    // Precisamos saber o limite do evento. Como findById traz o evento junto:
    // @ts-ignore
    const allowedCheckins = registration.event.allowed_checkins || 1;
    
    if (registration.checkins_count >= allowedCheckins) {
      throw new Error("Max check-ins reached for this user");
    }

    // 4. Realiza o Check-in
    const checkin = await this.checkinRepository.create({
      registration_id: registrationId,
      method: "manual" // ou "qr" se viesse do front
    });

    return checkin;
  }
}