import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";

export class ManageRegistrationUseCase {
  constructor(private registrationRepository: IRegistrationRepository) {}

  async execute(registrationId: string, status: "approved" | "refused", requesterId: string) {
    const registration = await this.registrationRepository.findById(registrationId);

    if (!registration) {
      throw new Error("Registration not found");
    }

    const updatedRegistration = await this.registrationRepository.updateStatus(registrationId, status);
    return updatedRegistration;
  }
}