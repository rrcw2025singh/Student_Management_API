import { Request, Response } from "express";
import { HTTP } from "../../../../constants/httpConstants";
import { validateStudent } from "../validation/studentValidation";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentServices";
import { Student } from "../models/studentModel";

export const getStudentsHandler = (_req: Request, res: Response): void => {
  const students = getAllStudents();
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

  const createdStudent = createStudent(newStudent);
  res.status(HTTP.CREATED).json(createdStudent);
};

export const updateStudentHandler = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const updatedStudent = updateStudent(id, req.body);

  if (!updatedStudent) {
    res.status(HTTP.NOT_FOUND).json({ message: "Student not found" });
    return;
  }

  res.status(HTTP.OK).json(updatedStudent);
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