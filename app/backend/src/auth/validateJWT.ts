import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv/config');

const secret = process.env.JWT_SECRET;

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  jwt.verify(token, secret as jwt.Secret, (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.user = user;
    next();
  });
};
