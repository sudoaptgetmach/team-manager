import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
export declare class UpdateTicketDto {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
}
