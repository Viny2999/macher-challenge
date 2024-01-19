import { IUserRepository } from '../../types/IUserRepository';

class User {
  id: string;
  name: string;

  constructor(userData: User) {
    this.id = userData.id;
    this.name = userData.name;
  }
}

export class UserRepositoryMock implements IUserRepository<User> {

  public async findAll(): Promise<User[]> {
    return [];
  }

  public async createUser(user: User): Promise<User> {
    return new User(user);
  }

  public async getUserById(id: string): Promise<User | null> {
    return new User({
      id,
      name: '',
    });
  }

  public async updateUser(id: string, user: Partial<User>): Promise<User> {
    return new User({
      id,
      name: '',
    });
  }

  public async deleteUser(id: string): Promise<boolean> {
    return true;
  }
}
