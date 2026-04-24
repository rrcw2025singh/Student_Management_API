import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await registerUser(email, password, role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};
export const register = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  // validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};