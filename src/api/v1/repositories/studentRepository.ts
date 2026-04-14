import { Student } from "../models/studentModel";

let students: Student[] = [];

export const findAllStudents = (): Student[] => students;

export const findStudentById = (id: string): Student | undefined =>
  students.find((student) => student.id === id);

export const addStudent = (student: Student): Student => {
  students.push(student);
  return student;
};

export const updateStudentById = (
  id: string,
  updatedData: Partial<Student>
): Student | null => {
  const student = students.find((item) => item.id === id);

  if (!student) {
    return null;
  }

  Object.assign(student, updatedData);
  return student;
};

export const removeStudent = (id: string): boolean => {
  const originalLength = students.length;
  students = students.filter((student) => student.id !== id);
  return students.length < originalLength;
};

export const resetStudents = (): void => {
  students = [];
};