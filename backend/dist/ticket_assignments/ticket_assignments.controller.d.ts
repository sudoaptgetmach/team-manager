import { TicketAssignmentsService } from './ticket_assignments.service';
import { CreateTicketAssignmentDto } from './dto/create-ticket_assignment.dto';
import { UpdateTicketAssignmentDto } from './dto/update-ticket_assignment.dto';
export declare class TicketAssignmentsController {
    private readonly ticketAssignmentsService;
    constructor(ticketAssignmentsService: TicketAssignmentsService);
    create(createTicketAssignmentDto: CreateTicketAssignmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTicketAssignmentDto: UpdateTicketAssignmentDto): string;
    remove(id: string): string;
}
