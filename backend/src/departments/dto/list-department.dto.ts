import { UUID } from "crypto";
import { Department } from "../entities/department.entity";
import { IsDate, IsString, IsUUID } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class ListDepartmentDto {

    @IsUUID()
    id: UUID;

    @IsString()
    name: string;

    users: User[];

    @IsDate()
    createdAt: string;

    @IsDate()
    updatedAt: string;

    constructor(department: Department) {
        this.id = department.id;
        this.name = department.name;
        this.users = department.users;
        this.createdAt = department.createdAt?.toDateString();
        this.updatedAt = department.updatedAt?.toDateString();
    }
}