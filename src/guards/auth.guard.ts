import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { decodeToken } from 'src/utils/jwt/decodeToken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const secret = this.configService.get('TOKEN_SECRET');
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    const tokenData = decodeToken(token, secret);
    req.message = tokenData;
    return true;
  }
}
