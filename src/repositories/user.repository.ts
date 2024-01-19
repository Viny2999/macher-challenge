import Auth from './models/auth';
import { User } from './models/user';

export class UserRepository {
  public async findAll(): Promise<User[]> {
    return User.findAll({
      include: [
        {
          model: Auth,
          as: 'createdBy',
          attributes: ['id', 'username'],
        },
        {
          model: Auth,
          as: 'updatedBy',
          attributes: ['id', 'username'],
        },
        {
          model: Auth,
          as: 'deletedBy',
          attributes: ['id', 'username'],
        },
      ],
      attributes: {
        exclude: ['created_by', 'updated_by', 'deleted_by'],
      },
    });
  }

  public async createUser(user: Partial<User>): Promise<User> {
    return User.create(user);
  }

  public async getUserById(id: string): Promise<User | null> {
    return User.findByPk(id, { 
      include: [
        {
          model: Auth,
          as: 'createdBy',
          attributes: ['id', 'username'],
        },
        {
          model: Auth,
          as: 'updatedBy',
          attributes: ['id', 'username'],
        },
        {
          model: Auth,
          as: 'deletedBy',
          attributes: ['id', 'username'],
        },
      ],
      attributes: {
        exclude: ['created_by', 'updated_by', 'deleted_by'],
      },
    });
  }

  public async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const existingUser = await User.findByPk(id);
    if (existingUser) {
      await existingUser.update(user);
      return existingUser;
    }
    return null;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}
