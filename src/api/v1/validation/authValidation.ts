import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().valid("admin", "user").required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegister = (data: unknown): string | null => {
  const { error } = registerSchema.validate(data);
  return error ? error.details[0].message : null;
};

export const validateLogin = (data: unknown): string | null => {
  const { error } = loginSchema.validate(data);
  return error ? error.details[0].message : null;
};