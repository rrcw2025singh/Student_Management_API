import { Request, Response } from "express";
import { HTTP } from "../../../constants/httpConstants";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../services/courseService";
import { Course } from "../models/courseModel";
import { validateCourse, validateCourseUpdate } from "../validation/courseValidation";

export const getCoursesHandler = (_req: Request, res: Response): void => {
  const courses = getAllCourses();

  res.status(HTTP.OK).json({
    success: true,
    message: "Courses retrieved successfully",
    data: courses,
  });
};

export const getCourseByIdHandler = (req: Request, res: Response): void => {
  const course = getCourseById(req.params.id);

  if (!course) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Course not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Course retrieved successfully",
    data: course,
  });
};

export const createCourseHandler = (req: Request, res: Response): void => {
  const validationError = validateCourse(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
    };

    const course = createCourse(newCourse);

    res.status(HTTP.CREATED).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to create course",
    });
  }
};

export const updateCourseHandler = (req: Request, res: Response): void => {
  const validationError = validateCourseUpdate(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const course = updateCourse(req.params.id, req.body);

  if (!course) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Course not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Course updated successfully",
    data: course,
  });
};

export const deleteCourseHandler = (req: Request, res: Response): void => {
  const deleted = deleteCourse(req.params.id);

  if (!deleted) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Course not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Course deleted successfully",
  });
};