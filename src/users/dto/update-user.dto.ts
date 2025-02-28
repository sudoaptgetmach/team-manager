import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsUUID()
  departmentId?: UUID;
}