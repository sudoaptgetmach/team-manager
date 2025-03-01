import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UUID } from 'crypto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(paginationDto: PaginationDto, tokenPayload: TokenPayloadDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: import("./enum/user-roles.enum").UserRoles;
        department: import("../departments/entities/department.entity").Department;
        tickets: import("../tickets/entities/ticket.entity").Ticket[];
    }[]>;
    findOne(id: UUID, tokenPayload: TokenPayloadDto): Promise<{
        department: import("../departments/entities/department.entity").Department;
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: import("./enum/user-roles.enum").UserRoles;
        tickets: import("../tickets/entities/ticket.entity").Ticket[];
    }>;
    findTickets(id: UUID, tokenPayload: TokenPayloadDto): Promise<import("./entities/user.entity").User | null>;
    update(id: UUID, updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto): Promise<import("./dto/list-user.dto").ListUserDto>;
    remove(id: UUID, tokenPayload: TokenPayloadDto): Promise<import("typeorm").DeleteResult>;
}
