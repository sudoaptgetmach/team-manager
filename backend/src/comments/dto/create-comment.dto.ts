import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Ticket } from "src/tickets/entities/ticket.entity";

export class CreateCommentDto {

    @Type(() => Ticket)
    @IsUUID()
    @IsNotEmpty()
    ticketId: UUID;
    
    @IsString()
    @IsNotEmpty()
    message: string;

}
