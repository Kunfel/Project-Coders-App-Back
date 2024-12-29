import Joi from 'joi';
import { joiConfig } from '../config/joi.config.js';

const submissionSchema = Joi.object({
  challenge_id: Joi.string().required(),
  lang: Joi.string().valid('py', 'js').required(),
  code: Joi.string().required()
});

export const submissionValidator = (req, res, next) => {
  const { error } = submissionSchema.validate(req.body, joiConfig);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};