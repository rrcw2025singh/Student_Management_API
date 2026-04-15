import { Course } from "../models/courseModel";
import {
  addCourse,
  findAllCourses,
  findCourseById,
  removeCourse,
  resetCourses,
  updateCourseById,
} from "../repositories/courseRepository";

export const getAllCourses = (): Course[] => findAllCourses();

export const getCourseById = (id: string): Course | undefined =>
  findCourseById(id);

export const createCourse = (course: Course): Course => {
  const existingCourse = findAllCourses().find(
    (item) => item.code.toLowerCase() === course.code.toLowerCase()
  );

  if (existingCourse) {
    throw new Error("Course with this code already exists");
  }

  return addCourse(course);
};

export const updateCourse = (
  id: string,
  updatedData: Partial<Course>
): Course | null => {
  return updateCourseById(id, updatedData);
};

export const deleteCourse = (id: string): boolean => removeCourse(id);

export const clearCourses = (): void => resetCourses();