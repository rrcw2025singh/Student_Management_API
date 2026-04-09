import { Student, StudentQuery } from "../models/studentModel";

let students: Student[] = [];

export const getAllStudents = (query?: StudentQuery): Student[] => {
  let result = [...students];

  if (query?.firstName) {
    result = result.filter((student) =>
      student.firstName.toLowerCase().includes(query.firstName!.toLowerCase())
    );
  }

  if (query?.program) {
    result = result.filter((student) =>
      student.program.toLowerCase().includes(query.program!.toLowerCase())
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
  return students.find((student) => student.id === id);
};

export const createStudent = (student: Student): Student => {
  const existingStudent = students.find(
    (existing) => existing.email.toLowerCase() === student.email.toLowerCase()
  );

  if (existingStudent) {
    throw new Error("Student with this email already exists");
  }

  students.push(student);
  return student;
};

export const updateStudent = (
  id: string,
  updatedData: Partial<Student>
): Student | null => {
  const student = students.find((s) => s.id === id);

  if (!student) {
    return null;
  }

  if (updatedData.email) {
    const emailExists = students.find(
      (s) =>
        s.id !== id && s.email.toLowerCase() === updatedData.email!.toLowerCase()
    );

    if (emailExists) {
      throw new Error("Student with this email already exists");
    }
  }

  Object.assign(student, updatedData);
  return student;
};

export const deleteStudent = (id: string): boolean => {
  const initialLength = students.length;
  students = students.filter((student) => student.id !== id);
  return students.length < initialLength;
};

export const clearStudents = (): void => {
  students = [];
};