import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return 'login service';
  }

  register() {
    return 'register service';
  }
}
