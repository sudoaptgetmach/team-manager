import { CreateTicketAssignmentDto } from './dto/create-ticket_assignment.dto';
import { UpdateTicketAssignmentDto } from './dto/update-ticket_assignment.dto';
export declare class TicketAssignmentsService {
    create(createTicketAssignmentDto: CreateTicketAssignmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTicketAssignmentDto: UpdateTicketAssignmentDto): string;
    remove(id: number): string;
}
