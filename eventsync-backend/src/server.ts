import express from "express";
import cors from "cors";
import { authRoutes } from "./presentation/routes/auth.routes";
import { eventsRoutes } from "./presentation/routes/events.routes"; 
import { socialRoutes } from "./presentation/routes/social.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes); 
app.use("/social", socialRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});