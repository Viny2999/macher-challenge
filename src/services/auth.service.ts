import bcrypt from 'bcrypt';
import * as httpsStatus from 'http-status';
import { Request, Response } from 'express';
import { AuthRepository } from '../repositories/auth.repository';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const authRepository = new AuthRepository();

export class AuthService {

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const user = await authRepository.findByUsername(username);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return res.send({ token });
      }
      return res.status(httpsStatus.UNAUTHORIZED).send({ message: 'Invalid password' });
    }
    return res.status(httpsStatus.UNAUTHORIZED).send({ message: 'User doesn\'t exist' });
  };
}
