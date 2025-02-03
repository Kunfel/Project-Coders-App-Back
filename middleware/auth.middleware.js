import jwt from 'jsonwebtoken';

export const auth = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      // Adding user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email
      };
      
      next();
    } catch (error) {
      res.status(401).json({ error: 'Please authenticate' });
    }
  };
};