import express from 'express';
import { getLeaderboard, getTopCoders } from '../modules/leaderboard/leaderboard.controller.js';

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/top', getTopCoders);

export default router;