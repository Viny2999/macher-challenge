import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { User } from './types/user.type';
import * as httpsStatus from 'http-status';

const userRepository = new UserRepository();

export class UserService {
  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userRepository.findAll();
      return res.send(users);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;

      const user = await userRepository.getUserById(reqId);
      if (user) {
        return res.send(user);
      }
      return res.status(httpsStatus.UNAUTHORIZED).send({ message: 'User doesn\'t exist' });
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: User = req.body;
      const newUser = await userRepository.createUser(user);
      return res.send(newUser);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;
      const userToUpdate: Partial<User> = req.body;

      const userUpdated = await userRepository.updateUser(reqId, userToUpdate);
      return res.send(userUpdated);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;

      await userRepository.deleteUser(reqId);
      return res.send({ message: 'User deleted' });
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };
}
