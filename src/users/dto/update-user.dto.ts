import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { Department } from 'src/departments/entities/department.entity';

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
  department?: Department;
}