import express from 'express';
import { 
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap
} from '../modules/stats/stats.controller.js';

const router = express.Router();

router.get('/coder/:id/solved-challenges', getSolvedChallengesStats);
router.get('/trending-categories', getTrendingCategories);
router.get('/coder/:id/heatmap', getHeatmap);

export default router;