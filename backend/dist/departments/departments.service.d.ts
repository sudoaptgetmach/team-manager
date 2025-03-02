import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UserRoles } from 'src/users/enum/user-roles.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class DepartmentsService {
    private readonly userRepository;
    private readonly departmentRepository;
    constructor(userRepository: Repository<User>, departmentRepository: Repository<Department>);
    create(createDepartmentDto: CreateDepartmentDto, tokenPayload: TokenPayloadDto): Promise<Department>;
    update(id: UUID, updateDepartmentDto: UpdateDepartmentDto, tokenPayload: TokenPayloadDto): Promise<Department>;
    findOne(id: UUID): Promise<{
        owner: User | undefined;
        id: UUID;
        name: string;
        users: User[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: User[];
    }[]>;
    findUsersByDepartment(departmentId: UUID): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: UserRoles;
        department: Department;
        tickets: import("../tickets/entities/ticket.entity").Ticket[];
    }[]>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
