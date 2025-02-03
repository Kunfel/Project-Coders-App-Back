import { UserModel } from '../../models/User.js';
import { registerUser, loginUser, verifyEmail } from './services/auth.service.js';

export const registerCoder = async (req, res) => {
  try {
    const user = await registerUser(req.body, 'coder');
    res.status(201).json({
      message: 'Coder registered successfully. Please check your email for verification.'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerManager = async (req, res) => {
  try {
    const user = await registerUser(req.body, 'manager');
    res.status(201).json({
      message: 'Manager registered successfully. Please check your email for verification.'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginCoder = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password, 'coder');
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password, 'manager');
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmailToken = async (req, res) => {
  try {
    const { token } = req.query;
    await verifyEmail(token);
    res.send(`Email Verified Successfully!`);
  } catch (error) {
    res.send(`Email Verification Failed: ${error.message}`);
  }
};

export const getCoderProfile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id, role: 'Coder' });
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getManagerProfile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id, role: 'Manager' });
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoderProfile = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.user.id, role: 'Coder' },
      { $set: req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateManagerProfile = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.user.id, role: 'Manager' },
      { $set: req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};