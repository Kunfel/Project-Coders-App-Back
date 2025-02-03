import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../../models/User.js';
import { sendVerificationEmail } from './email.service.js';

export const registerUser = async (userData, role) => {
  // Checking if email already exists
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // Creating user
  const user = new UserModel({
    ...userData,
    password: hashedPassword,
    role: role,
    is_verified: false
  });

  await user.save();
  
  // Sending verification email
  await sendVerificationEmail(user);
  
  return user;
};

export const loginUser = async (email, password, role) => {
  const user = await UserModel.findOne({ email, role });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.is_verified) {
    throw new Error('Please verify your email first');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { user, token };
};

export const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }

    user.is_verified = true;
    await user.save();

    return user;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};