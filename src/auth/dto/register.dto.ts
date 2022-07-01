import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  password: string;
}
