import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  allUsers() {
    return 'all users serivce';
  }

  singleUser(id: string) {
    return 'single user service ' + id;
  }

  updateUser(id: string) {
    return 'single user update service ' + id;
  }

  deleteUser(id: string) {
    return 'single user delete service ' + id;
  }
}
