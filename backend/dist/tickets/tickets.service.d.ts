import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ListTicketDto } from './dto/list-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
export declare class TicketsService {
    private ticketRepository;
    private userRepository;
    private departmentRepository;
    constructor(ticketRepository: Repository<Ticket>, userRepository: Repository<User>, departmentRepository: Repository<Department>);
    create(createTicketDto: CreateTicketDto): Promise<ListTicketDto>;
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
    findOne(id: UUID): Promise<ListTicketDto>;
    findUsers(id: UUID): Promise<Ticket>;
    update(id: UUID, updateTicketDto: UpdateTicketDto): Promise<ListTicketDto>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
