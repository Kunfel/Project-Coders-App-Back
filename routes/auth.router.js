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
  updateManagerProfile 
} from '../modules/auth/auth.controller.js';


const router = express.Router();

router.post('/coder/register', registerValidator, registerCoder);
router.post('/manager/register', registerValidator, registerManager);
router.post('/coder/login', loginValidator, loginCoder);
router.post('/manager/login', loginValidator, loginManager);
router.get('/coder/profile', getCoderProfile);
router.get('/manager/profile', getManagerProfile);
router.put('/coder/profile', updateCoderProfile);
router.put('/manager/profile', updateManagerProfile);

export default router; 