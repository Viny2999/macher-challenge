import { Response } from 'express';
import { UserRequest } from '../types/user-request.type';
import { UserRepository } from '../repositories/user.repository';
import { User } from './types/user.type';
import * as httpsStatus from 'http-status';

const userRepository = new UserRepository();

export class UserService {
  public findAll = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const users = await userRepository.findAll();
      return res.send(users);
    } catch (error) {
      console.log('UserService :: findAll= :: error:', error);
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public findOne = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;

      const user = await userRepository.getUserById(reqId);
      if (user) {
        return res.send(user);
      }
      return res.status(httpsStatus.UNAUTHORIZED).send({ message: 'User doesn\'t exist' });
    } catch (error) {
      console.log('UserService :: findOne= :: error:', error);
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public create = async (req: UserRequest, res: Response): Promise<Response> => {
    const { userId } = req.data.user;
    const user: User = req.body;

    const userToCreate: User = {
      ...user,
      created_at: new Date(),
      created_by: userId,
    };

    try {
      const newUser = await userRepository.createUser(userToCreate);
      return res.send(newUser);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public update = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;
      const { userId } = req.data.user;
      const partialUser: Partial<User> = req.body;

      const userToUpdate: Partial<User> = {
        ...partialUser,
        updated_at: new Date(),
        updated_by: userId,
      };

      const userUpdated = await userRepository.updateUser(reqId, userToUpdate);
      return res.send(userUpdated);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public delete = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;
      const { userId } = req.data.user;

      const userToUpdate: Partial<User> = {
        status: false,
        deleted_at: new Date(),
        deleted_by: userId,
      };

      await userRepository.updateUser(reqId, userToUpdate);
      return res.send({ message: 'User deleted' });
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };
}
