import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import studentRoutes from "./api/v1/routes/studentRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/students", studentRoutes);

export default app;