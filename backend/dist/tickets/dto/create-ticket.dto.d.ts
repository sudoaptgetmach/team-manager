import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { UUID } from 'crypto';
export declare class CreateTicketDto {
    title: string;
    description: string;
    department: UUID;
    user: UUID;
    assignee: UUID;
    priority: TicketPriority;
    status: TicketStatus;
}
