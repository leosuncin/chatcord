import { IsDefined, IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @IsDefined()
  @IsString()
  username: NonNullable<string>;

  @IsOptional()
  @IsString()
  avatar?: string;
}
