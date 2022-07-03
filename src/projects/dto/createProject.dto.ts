import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  cat: string;

  @IsString()
  url: string;

  @IsString()
  img: string;
}
