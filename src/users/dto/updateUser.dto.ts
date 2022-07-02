import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(4, 50)
  @IsOptional()
  username: string;

  @IsString()
  @Length(4, 50)
  @IsOptional()
  password: string;
}
