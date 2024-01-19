import { Request } from 'express';

interface AppRequest<T> extends Request {
  data: T;
}

interface User {
  userId: number;
  iat: number;
  exp: number;
}

export type UserRequest = AppRequest<{ user: User}>;
