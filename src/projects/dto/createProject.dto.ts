import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  desc: string;

  @IsString()
  @IsNotEmpty()
  cat: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  img: string;
}
