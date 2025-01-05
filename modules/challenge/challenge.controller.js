import { ChallengeService } from './services/challenge.service.js';

export const createChallenge = async (req, res) => {
  try {
    const challenge = await ChallengeService.createChallenge(req.body, req.user._id);
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllChallenges = async (req, res) => {
  try {
    const isManager = req.user.role === 'Manager';
    const challenges = await ChallengeService.listChallenges(req.user._id, isManager);
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const isManager = req.user.role === 'Manager';
    const challenge = await ChallengeService.getChallengeById(id, req.user._id, isManager);
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await ChallengeService.listCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};