import Joi from "joi";

const enrollmentSchema = Joi.object({
  studentId: Joi.string().required(),
  courseId: Joi.string().required(),
  status: Joi.string().valid("active", "completed").required(),
});

export const validateEnrollment = (data: unknown): string | null => {
  const { error } = enrollmentSchema.validate(data);
  return error ? error.details[0].message : null;
};