import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

interface UserIDJwtPayload extends JwtPayload {
  id: string;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const secret = this.configService.get('TOKEN_SECRET');
    if (!req.headers?.authorization) {
      throw new HttpException('Missing token', HttpStatus.BAD_REQUEST);
    }
    const token = req.headers?.authorization.split(' ')[1];

    const { userId } = <UserIDJwtPayload>verify(token, secret);
    req.user = userId;
    return true;
  }
}
