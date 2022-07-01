import * as jwt from 'jsonwebtoken';

export const generateToken = (id: string, secret: string): string =>
  jwt.sign({ userId: id }, secret);
