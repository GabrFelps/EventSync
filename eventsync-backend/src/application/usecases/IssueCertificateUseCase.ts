import { IFeedbackRepository } from "../../domain/repositories/IFeedbackRepository";

export class IssueCertificateUseCase {
  constructor(private feedbackRepository: IFeedbackRepository) {}

  async execute(userId: string, eventId: string) {
    // 1. Busca dados
    const data = await this.feedbackRepository.findEventAndRegistration(userId, eventId);
    if (!data) throw new Error("Registration not found");

    const { event, registration } = data;

    // 2. Valida check-in (Regra essencial do PDF)
    if (registration.checkins_count < 1) {
      throw new Error("Cannot issue certificate: No check-in recorded");
    }

    // 3. Se já existe certificado, retorna o existente (não cria duplicado)
    const existing = await this.feedbackRepository.findCertificate(userId, eventId);
    if (existing) return existing;

    // 4. Cria o Certificado
    // Aqui geramos um PDF fictício (URL) para o MVP.
    const validationCode = Math.random().toString(36).substring(7).toUpperCase();
    
    return this.feedbackRepository.createCertificate({
      user_id: userId,
      event_id: eventId,
      validation_code: validationCode,
      pdf_url: `http://localhost:3333/certificates/${validationCode}.pdf` // Mock
    });
  }
}