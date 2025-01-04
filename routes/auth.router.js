import express from 'express';
import { registerValidator, loginValidator } from '../modules/auth/auth.validation.js';
import { 
  registerCoder, 
  registerManager, 
  loginCoder, 
  loginManager,
  getCoderProfile,
  getManagerProfile,
  updateCoderProfile,
  updateManagerProfile, 
  verifyEmailToken
} from '../modules/auth/auth.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/coder/register', registerValidator, registerCoder);
router.post('/manager/register', registerValidator, registerManager);
router.post('/coder/login', loginValidator, loginCoder);
router.post('/manager/login', loginValidator, loginManager);
router.get('/verify', verifyEmailToken);

// Protected routes
router.get('/coder/profile', auth(['Coder']), getCoderProfile);
router.get('/manager/profile', auth(['Manager']), getManagerProfile);
router.put('/coder/profile', auth(['Coder']), updateCoderProfile);
router.put('/manager/profile', auth(['Manager']), updateManagerProfile);

export default router;
