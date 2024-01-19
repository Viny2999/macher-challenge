import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IAuthRepository } from '../types/IAuthRepository';
dotenv.config();

export class AuthService {
  private authRepository: IAuthRepository<any>;

  constructor(authRepository: IAuthRepository<any>) {
    this.authRepository = authRepository;
  }

  public login = async (username: string, password: string) => {
    const user = await this.authRepository.findByUsername(username);
    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        return {
          success: true, 
          message: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        };
      }
      return {
        success: false, 
        message: 'Invalid password'
      };
    }
    return {
      success: false, 
      message: 'User doesn\'t exist'
    };
  };
}
