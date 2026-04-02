import { Router } from "express";
import { HTTP } from "../../../constants/httpConstants";

const router = Router();

router.get("/", (_req, res) => {
  res.status(HTTP.OK).json({
    success: true,
    message: "API is healthy",
  });
});

export default router;