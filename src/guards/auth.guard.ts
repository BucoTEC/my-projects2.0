import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const secret = this.configService.get('TOKEN_SECRET');

    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new HttpException('Missing token', HttpStatus.BAD_REQUEST);
    }
    const decodeToken = verify(token, secret);

    req.user = decodeToken;
    return true;
  }
}
