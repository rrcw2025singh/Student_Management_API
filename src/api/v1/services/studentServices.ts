import { Student } from "../models/studentModel";

let students: Student[] = [];

export const getAllStudents = (): Student[] => {
  return students;
};

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const createStudent = (student: Student): Student => {
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