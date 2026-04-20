import { Request, Response, NextFunction } from "express";
import { HTTP } from "../constants/httpConstants";
import { verifyToken } from "../utils/jwt";

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

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    res.locals.user = decoded;
    res.locals.userRole = decoded.role;

    next();
  } catch {
    res.status(HTTP.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export const authorizeAdmin = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.locals.userRole !== "admin") {
    res.status(HTTP.FORBIDDEN).json({
      success: false,
      message: "Forbidden. Admin access only.",
    });
    return;
  }

  next();
};