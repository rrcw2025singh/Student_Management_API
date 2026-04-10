import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import studentRoutes from "./api/v1/routes/studentRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/students", studentRoutes);

export default app;