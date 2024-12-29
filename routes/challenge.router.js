import express from 'express';
import { 
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getCategories
} from '../modules/challenge/challenge.controller.js';
import { challengeValidator } from '../modules/challenge/challenge.validation.js';

const router = express.Router();

// Challenge routes
router.post('/', challengeValidator, createChallenge);
router.get('/', getAllChallenges);
router.get('/categories', getCategories);
router.get('/:id', getChallengeById);

export default router;