import express from "express";

const healthRoutesModule: any = require("./src/api/v1/routes/healthRoutes");
const healthRoutes = healthRoutesModule?.default ?? healthRoutesModule;
const studentRoutesModule: any = require("./src/api/v1/routes/studentRoutes");
const studentRoutes = studentRoutesModule?.default ?? studentRoutesModule;

const app = express();

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/students", studentRoutes);

export default app;