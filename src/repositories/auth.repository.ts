import Auth from './models/auth';

export class AuthRepository {
  public async create(authData: Partial<Auth>): Promise<Auth> {
    return Auth.create(authData);
  }

  public async findAll(): Promise<Auth[]> {
    return Auth.findAll();
  }

  public async findById(id: number): Promise<Auth | null> {
    return Auth.findByPk(id);
  }

  public async findByUsername(username: string): Promise<Auth | null> {
    return Auth.findOne({ where: { username } });
  }

  public async update(authData: Partial<Auth>): Promise<[number]> {
    const { id, ...updatedData } = authData;
    return Auth.update(updatedData, { where: { id } });
  }

  public async delete(id: number): Promise<number> {
    return Auth.destroy({ where: { id } });
  }
}
