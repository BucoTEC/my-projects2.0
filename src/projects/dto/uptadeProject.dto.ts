import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @Length(3, 30)
  title: string;

  @IsString()
  @IsOptional()
  @Length(5)
  desc: string;

  @IsString()
  @IsOptional()
  cat: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  img: string;
}
