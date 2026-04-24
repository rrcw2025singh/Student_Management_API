import { Request, Response } from "express";
import { HTTP } from "../../../constants/httpConstants";
import {
  validateStudent,
  validateStudentUpdate,
} from "../validation/studentValidation";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentServices";
import { StudentQuery } from "../models/studentModel";

export const getStudentsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query: StudentQuery = {
    firstName:
      typeof req.query.firstName === "string" ? req.query.firstName : undefined,
    program:
      typeof req.query.program === "string" ? req.query.program : undefined,
    yearLevel:
      typeof req.query.yearLevel === "string" ? req.query.yearLevel : undefined,
    sortBy:
      typeof req.query.sortBy === "string"
        ? (req.query.sortBy as StudentQuery["sortBy"])
        : undefined,
    order:
      typeof req.query.order === "string"
        ? (req.query.order as StudentQuery["order"])
        : undefined,
  };

  const students = await getAllStudents(query);

  res.status(HTTP.OK).json({
    success: true,
    message: "Students retrieved successfully",
    data: students,
  });
};

export const getStudentByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = String(req.params.id);
  const student = await getStudentById(id);

  if (!student) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Student not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Student retrieved successfully",
    data: student,
  });
};

export const createStudentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const validationError = validateStudent(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const createdStudent = await createStudent({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      program: req.body.program,
      yearLevel: req.body.yearLevel,
    });

    res.status(HTTP.CREATED).json({
      success: true,
      message: "Student created successfully",
      data: createdStudent,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to create student",
    });
  }
};

export const updateStudentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = String(req.params.id);
  const validationError = validateStudentUpdate(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: validationError,
    });
    return;
  }

  try {
    const updatedStudent = await updateStudent(id, req.body);

    if (!updatedStudent) {
      res.status(HTTP.NOT_FOUND).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    res.status(HTTP.OK).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to update student",
    });
  }
};

export const deleteStudentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = String(req.params.id);
  const deleted = await deleteStudent(id);

  if (!deleted) {
    res.status(HTTP.NOT_FOUND).json({
      success: false,
      message: "Student not found",
    });
    return;
  }

  res.status(HTTP.OK).json({
    success: true,
    message: "Student deleted successfully",
  });
};