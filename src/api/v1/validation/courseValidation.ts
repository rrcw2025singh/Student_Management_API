import Joi from "joi";

const courseSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
});

const courseUpdateSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  code: Joi.string().trim(),
}).min(1);

export const validateCourse = (data: unknown): string | null => {
  const { error } = courseSchema.validate(data);
  return error ? error.details[0].message : null;
};

export const validateCourseUpdate = (data: unknown): string | null => {
  const { error } = courseUpdateSchema.validate(data);
  return error ? error.details[0].message : null;
};