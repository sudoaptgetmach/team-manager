import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;
    
    @IsEnum(TicketPriority)
    @IsOptional()
    @IsNotEmpty()
    priority: TicketPriority;  

}
