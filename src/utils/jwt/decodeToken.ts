import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const decodeToken = (token: string, secret: string) =>
  jwt.verify(token, secret, function (err) {
    if (err) throw new HttpException('Bad token', HttpStatus.BAD_REQUEST);
  });
