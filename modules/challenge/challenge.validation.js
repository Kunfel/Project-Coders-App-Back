import Joi from 'joi';
import { joiConfig } from '../config/joi.config.js';

const codeSchema = Joi.object({
  function_name: Joi.string().required(),
  code_text: Joi.array().items(
    Joi.object({
      language: Joi.string().valid('py', 'js').required(),
      text: Joi.string().required()
    })
  ).required(),
  inputs: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required()
    })
  ).required()
});

const testSchema = Joi.object({
  weight: Joi.number().required(),
  inputs: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      value: Joi.any().required()
    })
  ).required(),
  output: Joi.any().required()
});

const challengeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  code: codeSchema.required(),
  tests: Joi.array().items(testSchema).required()
});

export const challengeValidator = (req, res, next) => {
  const { error } = challengeSchema.validate(req.body, joiConfig);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};