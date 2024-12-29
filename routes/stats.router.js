import express from 'express';
import { 
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap
} from '../modules/stats/stats.controller.js';

const router = express.Router();

router.get('/solved-challenges', getSolvedChallengesStats);
router.get('/trending-categories', getTrendingCategories);
router.get('/heatmap', getHeatmap);

export default router;