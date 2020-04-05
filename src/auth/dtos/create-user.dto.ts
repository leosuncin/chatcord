import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUser {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: NonNullable<string>;

  @IsDefined()
  @IsString()
  username: NonNullable<string>;

  @IsOptional()
  @IsString()
  avatar?: string;
}
