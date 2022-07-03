import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hashPassword } from 'src/utils/hashing/hashPassword';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async allUsers() {
    const allUsers = await await this.userModel
      .find({})
      .select({ username: 1, email: 1 });
    return { msg: 'all users', listAllUsers: allUsers };
  }

  async singleUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return {
      msg: 'single user',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async updateUser(id: string, body: UpdateUserDto) {
    if (body.password) {
      const hashedPassword = await hashPassword(body.password);
      await this.userModel.findByIdAndUpdate(id, {
        ...body,
        password: hashedPassword,
      });
      return 'single user update service ' + id;
    }

    await this.userModel.findByIdAndUpdate(id, body);
    return 'single user update service ' + id;
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return 'user deleter';
  }
}
