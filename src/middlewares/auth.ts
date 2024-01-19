import * as httpStatus from 'http-status';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserRequest } from '../types/user-request.type';
dotenv.config();

export const checkIfAuthenticated = async (req: UserRequest, res: Response, next: NextFunction) => {

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      req.data = {
        user: decoded,
      };

      return next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Invalid token' });
    }
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Please authenticate' });
  }
};
