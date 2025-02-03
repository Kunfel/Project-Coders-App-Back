import express from 'express';
import { 
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getCategories
} from '../modules/challenge/challenge.controller.js';
import { challengeValidator } from '../modules/challenge/challenge.validation.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Challenge routes
router.post('/', auth(['Manager']), challengeValidator, createChallenge);
router.get('/', auth(['Manager', 'Coder']), getAllChallenges);
router.get('/categories', auth(['Manager', 'Coder']), getCategories);
router.get('/:id', auth(['Manager', 'Coder']), getChallengeById);

export default router;