import { IsUUID, IsString, IsEnum } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { UUID } from 'crypto';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  department: UUID;

  @IsUUID()
  user: UUID;

  @IsUUID()
  assignee: UUID;

  @IsEnum(TicketPriority)
  priority: TicketPriority = TicketPriority.LOW;

  @IsEnum(TicketStatus)
  status: TicketStatus = TicketStatus.OPEN;
}