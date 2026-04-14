import Joi from "joi";

const studentSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  program: Joi.string().trim().required(),
  yearLevel: Joi.number().integer().min(1).max(4).required(),
});

const studentUpdateSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().email(),
  program: Joi.string().trim(),
  yearLevel: Joi.number().integer().min(1).max(4),
}).min(1);

export const validateStudent = (data: unknown): string | null => {
  const { error } = studentSchema.validate(data);
  return error ? error.details[0].message : null;
};

export const validateStudentUpdate = (data: unknown): string | null => {
  const { error } = studentUpdateSchema.validate(data);
  return error ? error.details[0].message : null;
};