import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ListDepartmentDto } from './dto/list-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { User } from 'src/users/entities/user.entity';
export declare class DepartmentsService {
    private readonly departmentRepository;
    constructor(departmentRepository: Repository<Department>);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(paginationDto: PaginationDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: User[];
    }[]>;
    findOne(id: UUID): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: User[];
    }>;
    findUsersByDepartment(departmentId: UUID): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        email: string;
        role: import("../users/enum/user-roles.enum").UserRoles;
        department: Department;
        tickets: import("../tickets/entities/ticket.entity").Ticket[];
    }[]>;
    update(id: UUID, updateDepartmentDto: UpdateDepartmentDto): Promise<ListDepartmentDto>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
