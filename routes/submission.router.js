import express from 'express';
import { submitSolution } from '../modules/submission/submission.controller.js';
import { submissionValidator } from '../modules/submission/submission.validation.js';

const router = express.Router();

router.post('/', submissionValidator, submitSolution);

export default router;