import { Student, StudentQuery } from "../models/studentModel";
import {
  addStudent,
  findAllStudents,
  findStudentById,
  removeStudent,
  resetStudents,
  updateStudentById,
} from "../repositories/studentRepository";

export const getAllStudents = (query?: StudentQuery): Student[] => {
  let result = [...findAllStudents()];

  if (query?.firstName) {
    const firstName = query.firstName.toLowerCase();
    result = result.filter((student) =>
      student.firstName.toLowerCase().includes(firstName)
    );
  }

  if (query?.program) {
    const program = query.program.toLowerCase();
    result = result.filter((student) =>
      student.program.toLowerCase().includes(program)
    );
  }

  if (query?.yearLevel) {
    result = result.filter(
      (student) => student.yearLevel === Number(query.yearLevel)
    );
  }

  if (query?.sortBy) {
    const sortField = query.sortBy;
    const sortOrder = query.order === "desc" ? -1 : 1;

    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });
  }

  return result;
};

export const getStudentById = (id: string): Student | undefined => {
  return findStudentById(id);
};

export const createStudent = (student: Student): Student => {
  const existingStudent = findAllStudents().find(
    (existing) => existing.email.toLowerCase() === student.email.toLowerCase()
  );

  if (existingStudent) {
    throw new Error("Student with this email already exists");
  }

  return addStudent(student);
};

export const updateStudent = (
  id: string,
  updatedData: Partial<Student>
): Student | null => {
  const student = findStudentById(id);

  if (!student) {
    return null;
  }

  if (updatedData.email) {
    const updatedEmail = updatedData.email.toLowerCase();

    const emailExists = findAllStudents().find(
      (s) => s.id !== id && s.email.toLowerCase() === updatedEmail
    );

    if (emailExists) {
      throw new Error("Student with this email already exists");
    }
  }

  return updateStudentById(id, updatedData);
};

export const deleteStudent = (id: string): boolean => {
  return removeStudent(id);
};

export const clearStudents = (): void => {
  resetStudents();
};