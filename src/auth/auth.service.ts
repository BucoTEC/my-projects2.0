import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  login() {
    return 'login service';
  }

  async register(body) {
    const { username, password, email } = body;
    const existingUser = await this.userModel.find({ email });
    if (existingUser) 'user already exists';
    return body;
  }
}
