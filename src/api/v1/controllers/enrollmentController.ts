import { Request, Response } from "express";
import { HTTP } from "../../../constants/httpConstants";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  getEnrollmentById,
} from "../services/enrollmentService";
import { Enrollment } from "../models/enrollmentModel";
import { validateEnrollment } from "../validation/enrollmentValidation";

export const getEnrollmentsHandler = (_req: Request, res: Response): void => {
  const enrollments = getAllEnrollments();

  res.status(HTTP.OK).json({
    success: true,
    message: "Enrollments retrieved successfully",
    data: enrollments,
  });
};

export const getEnrollmentByIdHandler = (req: Request, res: Response): void => {
  const enrollment = getEnrollmentById(req.params.id);

  if (!enrollment) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Enrollment not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Enrollment retrieved successfully",
    data: enrollment,
  });
};

export const createEnrollmentHandler = (req: Request, res: Response): void => {
  const validationError = validateEnrollment(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      status: req.body.status,
    };

    const enrollment = createEnrollment(newEnrollment);

    res.status(HTTP.CREATED).json({
      success: true,
      message: "Enrollment created successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to create enrollment",
    });
  }
};

export const deleteEnrollmentHandler = (req: Request, res: Response): void => {
  const deleted = deleteEnrollment(req.params.id);

  if (!deleted) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Enrollment not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Enrollment deleted successfully",
  });
};