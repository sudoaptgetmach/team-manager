import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description: string;
    
    @IsEnum(TicketStatus)
    @IsOptional()
    @IsNotEmpty()
    status: TicketStatus;

    @IsEnum(TicketPriority)
    @IsOptional()
    @IsNotEmpty()
    priority: TicketPriority;
}
