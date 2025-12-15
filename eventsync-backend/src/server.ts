import express from "express";
import cors from "cors";
import { authRoutes } from "./presentation/routes/auth.routes";
import { eventsRoutes } from "./presentation/routes/events.routes"; // <--- 1. ADICIONE ESSA IMPORTAÇÃO

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes); 

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});