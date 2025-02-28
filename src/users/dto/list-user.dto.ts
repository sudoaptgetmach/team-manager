import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "src/departments/entities/department.entity";
import { Type } from "class-transformer";

export class ListUserDto {
    @IsUUID()
    id: UUID;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRoles)
    role: UserRoles;

    @IsNotEmpty()
    @Type(() => Department)
    department: Department;

    @IsDate()
    createdAt: string;

    @IsDate()
    updatedAt: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.department = user.department;
        this.createdAt = new Date(user.createdAt).toDateString();
        this.updatedAt = new Date(user.updatedAt).toDateString();
    }
}