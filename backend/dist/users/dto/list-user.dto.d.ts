import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "src/departments/entities/department.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
export declare class ListUserDto {
    id: UUID;
    name: string;
    email: string;
    role: UserRoles;
    department: Department;
    tickets: Ticket[];
    createdAt: string;
    updatedAt: string;
    constructor(user: User);
}
