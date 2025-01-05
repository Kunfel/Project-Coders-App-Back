import express from 'express';
import { submitSolution } from '../modules/submission/submission.controller.js';
import { submissionValidator } from '../modules/submission/submission.validation.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Only coders can submit solutions
router.post('/', auth(['Coder']), submissionValidator, submitSolution);

export default router;