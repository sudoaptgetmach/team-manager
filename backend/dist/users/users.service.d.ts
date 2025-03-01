import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { HashingService } from 'src/auth/hash/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UserRoles } from './enum/user-roles.enum';
export declare class UsersService {
    private readonly hashingService;
    private readonly userRepository;
    private readonly departmentRepository;
    private readonly ticketRepository;
    constructor(hashingService: HashingService, userRepository: Repository<User>, departmentRepository: Repository<Department>, ticketRepository: Repository<Ticket>);
    findAll(paginationDto: PaginationDto, tokenPayload: TokenPayloadDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: UserRoles;
        department: Department;
        tickets: Ticket[];
    }[]>;
    findOne(id: UUID, tokenPayload: TokenPayloadDto): Promise<{
        department: Department;
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: UserRoles;
        tickets: Ticket[];
    }>;
    findTickets(id: UUID, tokenPayload: TokenPayloadDto): Promise<User | null>;
    update(id: UUID, updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto): Promise<ListUserDto>;
    remove(id: UUID, tokenPayload: TokenPayloadDto): Promise<import("typeorm").DeleteResult>;
}
