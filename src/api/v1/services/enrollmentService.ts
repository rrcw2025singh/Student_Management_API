import { Enrollment } from "../models/enrollmentModel";
import {
  addEnrollment,
  findAllEnrollments,
  findEnrollmentById,
  removeEnrollment,
  resetEnrollments,
} from "../repositories/enrollmentRepository";
import { findStudentById } from "../repositories/studentRepository";
import { findCourseById } from "../repositories/courseRepository";

export const getAllEnrollments = (): Enrollment[] => findAllEnrollments();

export const getEnrollmentById = (id: string): Enrollment | undefined =>
  findEnrollmentById(id);

export const createEnrollment = (enrollment: Enrollment): Enrollment => {
  const studentExists = findStudentById(enrollment.studentId);
  const courseExists = findCourseById(enrollment.courseId);

  if (!studentExists) {
    throw new Error("Student not found");
  }

  if (!courseExists) {
    throw new Error("Course not found");
  }

  return addEnrollment(enrollment);
};

export const deleteEnrollment = (id: string): boolean => removeEnrollment(id);

export const clearEnrollments = (): void => resetEnrollments();