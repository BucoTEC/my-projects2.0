import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { hashPassword } from "src/utils/hashPassword";
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // TODO add login dto && logic
  login() {
    return "login service";
  }
  //  TODO add register dto
  async register(body) {
    const { username, password, email } = body;
    const existingUser = await this.userModel.find({ email });
    if (existingUser) "user already exists";

    const hashedPassword = await hashPassword(password);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return {
      msg: "successfuly registerd",
      userData: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
