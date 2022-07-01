import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  allUsers() {
    return 'all users';
  }

  @Get()
  singleUsers() {
    return 'single user';
  }

  @Post()
  updateUsers() {
    return 'update user';
  }

  @Post()
  deleteUsers() {
    return 'delete user';
  }
}
