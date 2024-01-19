import { Response } from 'express';
import { UserRequest } from '../../types/user-request.type';
import { UserService } from '../../services';
import { User } from '../../repositories/models/user';
import * as httpsStatus from 'http-status';
import { UserRepository } from '../../repositories/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  public findAll = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const users = await userService.findAll();
      return res.send(users);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public findOne = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;

      const user = await userService.findOne(reqId);
      if (user) {
        return res.send(user);
      }
      return res.status(httpsStatus.UNAUTHORIZED).send({ message: 'User doesn\'t exist' });
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public create = async (req: UserRequest, res: Response): Promise<Response> => {
    const { userId } = req.data.user;
    const user: User = req.body;

    try {
      const newUser = await userService.create(userId, user);
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

      const userUpdated = await userService.update(reqId, userId, partialUser);
      return res.send(userUpdated);
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };

  public delete = async (req: UserRequest, res: Response): Promise<Response> => {
    try {
      const reqId = req.params.id;
      const { userId } = req.data.user;

      await userService.delete(reqId, userId);
      return res.send({ message: 'User deleted' });
    } catch (error) {
      return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({ message: error });
    }
  };
}
