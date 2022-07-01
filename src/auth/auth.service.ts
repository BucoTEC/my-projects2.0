import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hashPassword } from 'src/utils/hashing/hashPassword';
import { comparePassword } from 'src/utils/hashing/comparePassword';
import { ConfigService } from '@nestjs/config';
import { generateToken } from 'src/utils/jwt/generateToken';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  // LOGIN SERVICE
  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return 'no user found';
    }

    const isAuth = await comparePassword(password, user.password);
    if (!isAuth) {
      return 'wrong credetnials';
    }

    const token = generateToken(
      user.id,
      this.configService.get('TOKEN_SECRET'),
    );
    return {
      msg: 'succesfuly loged in ',
      user: { email, id: user.id },
      token: token,
    };
  }

  // REGISTER SERVICE
  async register(body: RegisterDto) {
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
