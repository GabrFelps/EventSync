import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { RegistrationController } from "../controllers/RegistrationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FeedbackController } from "../controllers/FeedbackController";

const feedbackController = new FeedbackController();
const eventsRoutes = Router();
const eventController = new EventController();
const registrationController = new RegistrationController();

// PÚBLICAS
eventsRoutes.get("/", eventController.list);
eventsRoutes.get("/:id", eventController.show);

// PROTEGIDAS
eventsRoutes.use(ensureAuthenticated);

// Eventos
eventsRoutes.post("/", eventController.create);

// Inscrições (Fluxo Participante)
eventsRoutes.post("/:id/register", registrationController.create);

// Gestão (Fluxo Organizador)
eventsRoutes.get("/:id/registrations", registrationController.listByEvent); // Ver quem tá inscrito

// --- ATENÇÃO: Rotas que usam o ID da Inscrição, não do Evento ---
eventsRoutes.put("/registrations/:id/status", registrationController.updateStatus);

// Rota: POST /events/registrations/:id/checkin (Realizar Check-in)
eventsRoutes.post("/registrations/:id/checkin", registrationController.checkIn);

// Avaliação
eventsRoutes.post("/:id/reviews", feedbackController.createReview);

// Certificado
eventsRoutes.get("/:id/certificate", feedbackController.getCertificate);

// Organizador confirma que recebeu a grana
eventsRoutes.put("/registrations/:id/confirm-payment", registrationController.confirmPayment);

export { eventsRoutes };