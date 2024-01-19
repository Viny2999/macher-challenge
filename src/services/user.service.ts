import { User } from './types/user.type';
import { IUserRepository } from '../types/IUserRepository';

export class UserService {
  private userRepository: IUserRepository<any>;

  constructor(userRepository: IUserRepository<any>) {
    this.userRepository = userRepository;
  }

  public findAll = async () => {
    const users = await this.userRepository.findAll();
    return users;
  };

  public findOne = async (id: string) => {
    return this.userRepository.getUserById(id);
  };

  public create = async (userId: number, user: User) => {
    const userToCreate: User = {
      ...user,
      created_at: new Date(),
      created_by: userId,
    };

    return this.userRepository.createUser(userToCreate);
  };

  public update = async (id: string, userId: number, partialUser: Partial<User>) => {
    const userToUpdate: Partial<User> = {
      ...partialUser,
      updated_at: new Date(),
      updated_by: userId,
    };

    return this.userRepository.updateUser(id, userToUpdate);
  };

  public delete = async (id: string, userId: number) => {
    const userToUpdate: Partial<User> = {
      status: false,
      deleted_at: new Date(),
      deleted_by: userId,
    };

    return this.userRepository.updateUser(id, userToUpdate);
  };
}
