export interface IUserRepository<T> {
  findAll(): Promise<T[]>;
  createUser(user: Partial<T>): Promise<T>;
  getUserById(id: string): Promise<T | null>;
  updateUser(id: string, user: Partial<T>): Promise<T>;
  deleteUser(id: string): Promise<boolean>;
}