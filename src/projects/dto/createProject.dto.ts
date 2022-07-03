import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  img: string;
}
