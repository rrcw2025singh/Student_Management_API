import { Course } from "../models/courseModel";

let courses: Course[] = [];

export const findAllCourses = (): Course[] => courses;

export const findCourseById = (id: string): Course | undefined =>
  courses.find((course) => course.id === id);

export const addCourse = (course: Course): Course => {
  courses.push(course);
  return course;
};

export const updateCourseById = (
  id: string,
  updatedData: Partial<Course>
): Course | null => {
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return null;
  }

  Object.assign(course, updatedData);
  return course;
};

export const removeCourse = (id: string): boolean => {
  const originalLength = courses.length;
  courses = courses.filter((course) => course.id !== id);
  return courses.length < originalLength;
};

export const resetCourses = (): void => {
  courses = [];
};