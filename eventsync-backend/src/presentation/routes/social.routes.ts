import { Router } from "express";
import { SocialController } from "../controllers/SocialController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const socialRoutes = Router();
const controller = new SocialController();

socialRoutes.use(ensureAuthenticated);

// Amizade
socialRoutes.post("/friends/request", controller.sendRequest); // Body: { recipientId }
socialRoutes.put("/friends/request/:id", controller.respondRequest); // Body: { action: "accepted" }
socialRoutes.get("/friends", controller.listFriends);

// Mensagens
socialRoutes.post("/messages", controller.sendMessage); // Body: { recipientId, content }
socialRoutes.get("/messages/:friendId", controller.listMessages);

export { socialRoutes };