import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Department } from "src/departments/entities/department.entity";

export class CreateUserDto {

    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Type(() => String)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    departmentId: UUID;
}
