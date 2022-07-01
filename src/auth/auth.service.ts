import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hashPassword } from 'src/utils/hashPassword';
import { comparePassword } from 'src/utils/comparePassword';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // TODO add login dto && logic
  async login(body) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return 'no user found';
    }

    const isAuth = await comparePassword(password, user.password);
    if (!isAuth) {
      return 'wrong credetnials';
    }
    return { msg: 'your body', data: password };
  }
  //  TODO add register dto
  async register(body) {
    const { username, password, email } = body;
    const existingUser = await this.userModel.find({ email });
    if (existingUser) 'user already exists';

    const hashedPassword = await hashPassword(password);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return {
      msg: 'successfuly registerd',
      userData: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
