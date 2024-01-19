import * as httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const checkIfAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      return next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Invalid token' });
    }
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Please authenticate' });
  }
};
