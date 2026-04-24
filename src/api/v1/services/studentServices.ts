import { Student, StudentQuery } from "../models/studentModel";
import {
  addStudent,
  findAllStudents,
  findStudentById,
  removeStudent,
  resetStudents,
  updateStudentById,
} from "../repositories/studentRepository";

export const getAllStudents = async (
  query?: StudentQuery
): Promise<Student[]> => {
  let result = [...(await findAllStudents())];

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

export const getStudentById = async (
  id: string
): Promise<Student | undefined> => {
  return findStudentById(id);
};

export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const existingStudent = (await findAllStudents()).find(
    (existing: Student) =>
      existing.email.toLowerCase() === student.email.toLowerCase()
  );

  if (existingStudent) {
    throw new Error("Student with this email already exists");
  }

  return addStudent(student);
};

export const updateStudent = async (
  id: string,
  updatedData: Partial<Student>
): Promise<Student | null> => {
  const student = await findStudentById(id);

  if (!student) {
    return null;
  }

  if (updatedData.email) {
    const updatedEmail = updatedData.email.toLowerCase();

    const emailExists = (await findAllStudents()).find(
      (s: Student) => s.id !== id && s.email.toLowerCase() === updatedEmail
    );

    if (emailExists) {
      throw new Error("Student with this email already exists");
    }
  }

  return updateStudentById(id, updatedData);
};

export const deleteStudent = async (id: string): Promise<boolean> => {
  return removeStudent(id);
};

export const clearStudents = async (): Promise<void> => {
  await resetStudents();
};