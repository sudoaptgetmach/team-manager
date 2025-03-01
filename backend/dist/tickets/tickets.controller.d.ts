import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Promise<import("./dto/list-ticket.dto").ListTicketDto>;
    findAll(paginationDto: PaginationDto): Promise<{
        openedAt: string;
        updatedAt: string;
        id: UUID;
        title: string;
        description: string;
        status: string;
        priority: string;
        department: string;
        user: string;
        assignee: string;
    }[]>;
    findOne(id: UUID): Promise<import("./dto/list-ticket.dto").ListTicketDto>;
    findUsers(id: UUID): Promise<import("./entities/ticket.entity").Ticket>;
    update(id: UUID, updateTicketDto: UpdateTicketDto): Promise<import("./dto/list-ticket.dto").ListTicketDto>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
