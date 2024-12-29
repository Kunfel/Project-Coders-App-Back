import Joi from 'joi';
import { joiConfig } from '../config/joi.config.js';

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  about: Joi.string()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const registerValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, joiConfig);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, joiConfig);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
