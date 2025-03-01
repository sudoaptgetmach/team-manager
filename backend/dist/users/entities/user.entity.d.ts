import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "../../departments/entities/department.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { UUID } from "crypto";
export declare class User {
    id: UUID;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    department: Department;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
