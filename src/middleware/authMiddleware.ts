import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Token missing.",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    res.locals.user = decoded;
    res.locals.userRole = decoded.role;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid token.",
    });
  }
};

export const authorizeAdmin = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden. Admin access only.",
    });
 
  }

  next();
};