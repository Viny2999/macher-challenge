import { IAuthRepository } from '../../types/IAuthRepository';

class Auth {
  id: number;
  username: string;
  password: string;

  constructor(authData: Auth) {
    this.id = authData.id;
    this.username = authData.username;
    this.password = authData.password;
  }
}

export class AuthRepositoryMock implements IAuthRepository<Auth> {

  public async create(authData: Auth): Promise<Auth> {
    return new Auth(authData);
  }

  public async findAll(): Promise<Auth[]> {
    return [];
  }

  public async findById(id: number): Promise<Auth | null> {
    return new Auth({
      id,
      username: 'test',
      password: 'test',
    });
  }

  public async findByUsername(username: string): Promise<Auth | null> {
    return new Auth({
      id: 1,
      username,
      password: 'test',
    });
  }

  public async update(authData: Partial<Auth>): Promise<[number]> {
    return [1];
  }

  public async delete(id: number): Promise<number> {
    return 1;
  }
}
