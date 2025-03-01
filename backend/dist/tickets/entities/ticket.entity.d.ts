import { UUID } from "crypto";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { Department } from "../../departments/entities/department.entity";
import { User } from "../../users/entities/user.entity";
export declare class Ticket {
    id: UUID;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    department: Department;
    user: User;
    assignee: User;
    openedAt: Date;
    updatedAt: Date;
    closedAt: Date;
}
