import { Request, Response } from "express";
import { HTTP } from "../../../constants/httpConstants";
import { validateStudent } from "../validation/studentValidation";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentServices";
import { Student, StudentQuery } from "../models/studentModel";

export const getStudentsHandler = (req: Request, res: Response): void => {
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

  const students = getAllStudents(query);
  res.status(HTTP.OK).json(students);
};

export const getStudentByIdHandler = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const student = getStudentById(id);

  if (!student) {
    res.status(HTTP.NOT_FOUND).json({ message: "Student not found" });
    return;
  }

  res.status(HTTP.OK).json(student);
};

export const createStudentHandler = (req: Request, res: Response): void => {
  const validationError = validateStudent(req.body);

  if (validationError) {
    res.status(HTTP.BAD_REQUEST).json({ message: validationError });
    return;
  }

  const newStudent: Student = {
    id: Date.now().toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    program: req.body.program,
    yearLevel: req.body.yearLevel,
  };

  try {
    const createdStudent = createStudent(newStudent);
    res.status(HTTP.CREATED).json(createdStudent);
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: error instanceof Error ? error.message : "Unable to create student",
    });
  }
};

export const updateStudentHandler = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const updatedData = req.body;

  if (
    updatedData.firstName !== undefined &&
    typeof updatedData.firstName !== "string"
  ) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "First name must be a string",
    });
    return;
  }

  if (
    updatedData.lastName !== undefined &&
    typeof updatedData.lastName !== "string"
  ) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Last name must be a string",
    });
    return;
  }

  if (
    updatedData.email !== undefined &&
    typeof updatedData.email !== "string"
  ) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Email must be a string",
    });
    return;
  }

  if (
    updatedData.program !== undefined &&
    typeof updatedData.program !== "string"
  ) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Program must be a string",
    });
    return;
  }

  if (
    updatedData.yearLevel !== undefined &&
    typeof updatedData.yearLevel !== "number"
  ) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Year level must be a number",
    });
    return;
  }

  try {
    const updatedStudent = updateStudent(id, updatedData);

    if (!updatedStudent) {
      res.status(HTTP.NOT_FOUND).json({ message: "Student not found" });
      return;
    }

    res.status(HTTP.OK).json(updatedStudent);
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: error instanceof Error ? error.message : "Unable to update student",
    });
  }
};

export const deleteStudentHandler = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const deleted = deleteStudent(id);

  if (!deleted) {
    res.status(HTTP.NOT_FOUND).json({ message: "Student not found" });
    return;
  }

  res.status(HTTP.OK).json({ message: "Student deleted successfully" });
};