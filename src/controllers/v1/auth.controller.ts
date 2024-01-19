import * as httpsStatus from 'http-status';
import { Request, Response } from 'express';
import { AuthService } from '../../services';

import * as dotenv from 'dotenv';
import { AuthRepository } from '../../repositories/auth.repository';
dotenv.config();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export class AuthController {

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const loginResponse = await authService.login(username, password);
    if (loginResponse.success) {
      return res.send({ token: loginResponse.message });
    }

    return res.status(httpsStatus.UNAUTHORIZED).send({ message: loginResponse.message });
  };
}
