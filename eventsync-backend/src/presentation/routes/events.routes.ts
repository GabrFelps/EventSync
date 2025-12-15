import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const eventsRoutes = Router();
const eventController = new EventController();

// 1. Rota PÚBLICA (Qualquer um vê a lista)
eventsRoutes.get("/", eventController.list);

// 2. Trava de Segurança (Daqui pra baixo precisa de Login)
eventsRoutes.use(ensureAuthenticated);

// 3. Rota PROTEGIDA (Só logado cria evento)
eventsRoutes.post("/", eventController.create);

export { eventsRoutes };