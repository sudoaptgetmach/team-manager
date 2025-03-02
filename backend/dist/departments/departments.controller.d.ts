import { UUID } from 'crypto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto, tokenPayload: TokenPayloadDto): Promise<import("./entities/department.entity").Department>;
    findAll(paginationDto: PaginationDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: import("../users/entities/user.entity").User[];
    }[]>;
    findOne(id: UUID): Promise<{
        owner: import("../users/entities/user.entity").User | undefined;
        id: UUID;
        name: string;
        users: import("../users/entities/user.entity").User[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUsersByDepartment(id: UUID): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: import("../users/enum/user-roles.enum").UserRoles;
        department: import("./entities/department.entity").Department;
        tickets: import("../tickets/entities/ticket.entity").Ticket[];
    }[]>;
    update(id: UUID, updateDepartmentDto: UpdateDepartmentDto, tokenPayloadDto: TokenPayloadDto): Promise<import("./entities/department.entity").Department>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
