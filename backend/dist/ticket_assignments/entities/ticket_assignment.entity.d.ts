import { UUID } from "crypto";
export declare class TicketAssignment {
    id: UUID;
    ticketId: UUID;
    userId: UUID;
    assignedAt: Date;
    updatedAt: Date;
}
