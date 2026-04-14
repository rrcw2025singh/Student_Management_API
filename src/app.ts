import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import healthRoutes from "./api/v1/routes/healthRoutes";
import authRoutes from "./api/v1/routes/authRoute";
import studentRoutes from "./api/v1/routes/studentRoutes";
import courseRoutes from "./api/v1/routes/courseRoutes";
import enrollmentRoutes from "./api/v1/routes/enrollmentRoutes";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);

app.use(errorHandler);

export default app;