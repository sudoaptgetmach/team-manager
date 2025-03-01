import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("./entities/department.entity").Department>;
    findAll(paginationDto: PaginationDto): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: import("../users/entities/user.entity").User[];
    }[]>;
    findOne(id: UUID): Promise<{
        createdAt: string;
        updatedAt: string;
        id: UUID;
        name: string;
        users: import("../users/entities/user.entity").User[];
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
    update(id: UUID, updateDepartmentDto: UpdateDepartmentDto): Promise<import("./dto/list-department.dto").ListDepartmentDto>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
