import { Request, Response, NextFunction } from "express";
import { HTTP } from "../constants/httpConstants";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(HTTP.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized. Token is missing or invalid.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (token !== "admin-token" && token !== "user-token") {
    res.status(HTTP.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized. Invalid token.",
    });
    return;
  }

  req.body.userRole = token === "admin-token" ? "admin" : "user";
  next();
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.userRole !== "admin") {
    res.status(HTTP.FORBIDDEN).json({
      success: false,
      message: "Forbidden. Admin access only.",
    });
    return;
  }

  next();
};