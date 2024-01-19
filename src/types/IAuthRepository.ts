export interface IAuthRepository<T> {
  create(authData: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  findByUsername(username: string): Promise<T | null>;
  update(authData: Partial<T>): Promise<[number]>;
  delete(id: number): Promise<number>;
}