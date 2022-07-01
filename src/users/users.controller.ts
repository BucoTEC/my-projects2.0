import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  allUsers() {
    return 'all users';
  }

  @Get(':id')
  singleUser(@Param('id') id: string) {
    return 'single user ' + id;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string) {
    return 'single user update ' + id;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'single user delete ' + id;
  }
}
