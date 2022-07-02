import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async allUsers() {
    const allUsers = await await this.userModel
      .find({})
      .select({ username: 1, email: 1 });
    return { msg: 'all users', listAllUsers: allUsers };
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
