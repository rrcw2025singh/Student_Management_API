import express from "express";
import studentRoutes from "./api/v1/routes/studentRoutes";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/students", studentRoutes);

export default app;