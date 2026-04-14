import { Request, Response } from "express";
import { HTTP } from "../../../constants/httpConstants";
import { loginUser, registerUser } from "../services/authService";
import { validateLogin, validateRegister } from "../validation/authValidation";

export const registerHandler = (req: Request, res: Response): void => {
  const validationError = validateRegister(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const user = registerUser(req.body.email, req.body.password, req.body.role);

    res.status(HTTP.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to register user",
    });
  }
};

export const loginHandler = (req: Request, res: Response): void => {
  const validationError = validateLogin(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const result = loginUser(req.body.email, req.body.password);

    res.status(HTTP.OK).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(HTTP.UNAUTHORIZED).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};