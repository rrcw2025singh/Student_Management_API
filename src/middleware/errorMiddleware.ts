import { Request, Response, NextFunction } from "express";
import { HTTP } from "../constants/httpConstants";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Internal server error",
  });
};