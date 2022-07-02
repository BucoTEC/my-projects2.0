import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  allUsers() {
    return this.usersService.allUsers();
  }

  @Get(':id')
  singleUser(@Param('id') id: string) {
    return this.usersService.singleUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
