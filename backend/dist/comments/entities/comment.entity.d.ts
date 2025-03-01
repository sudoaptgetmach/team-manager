import { UUID } from "crypto";
export declare class Comment {
    id: UUID;
    ticketId: UUID;
    userId: UUID;
    message: string;
    createdAt: Date;
}
