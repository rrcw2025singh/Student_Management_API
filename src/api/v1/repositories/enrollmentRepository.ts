import { Enrollment } from "../models/enrollmentModel";

let enrollments: Enrollment[] = [];

export const findAllEnrollments = (): Enrollment[] => enrollments;

export const findEnrollmentById = (id: string): Enrollment | undefined =>
  enrollments.find((enrollment) => enrollment.id === id);

export const addEnrollment = (enrollment: Enrollment): Enrollment => {
  enrollments.push(enrollment);
  return enrollment;
};

export const removeEnrollment = (id: string): boolean => {
  const originalLength = enrollments.length;
  enrollments = enrollments.filter((enrollment) => enrollment.id !== id);
  return enrollments.length < originalLength;
};

export const resetEnrollments = (): void => {
  enrollments = [];
};