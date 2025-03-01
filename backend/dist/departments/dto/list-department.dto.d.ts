import { UUID } from "crypto";
import { Department } from "../entities/department.entity";
import { User } from "src/users/entities/user.entity";
export declare class ListDepartmentDto {
    id: UUID;
    name: string;
    users: User[];
    createdAt: string;
    updatedAt: string;
    constructor(department: Department);
}
