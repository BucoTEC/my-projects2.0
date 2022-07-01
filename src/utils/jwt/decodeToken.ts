import * as jwt from 'jsonwebtoken';

export const decodeToken = (token: string, secret: string) =>
  jwt.verify(token, secret);
