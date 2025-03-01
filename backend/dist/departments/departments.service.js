"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_department_dto_1 = require("./dto/list-department.dto");
const department_entity_1 = require("./entities/department.entity");
const list_user_dto_1 = require("../users/dto/list-user.dto");
let DepartmentsService = class DepartmentsService {
    departmentRepository;
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async create(createDepartmentDto) {
        const newDepartmentData = {
            name: createDepartmentDto.name,
        };
        const newDepartment = this.departmentRepository.create(newDepartmentData);
        await this.departmentRepository.save(newDepartment);
        return newDepartment;
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};
        const departments = await this.departmentRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'asc',
            },
        });
        if (!departments || departments.length === 0) {
            throw new common_1.NotFoundException("Nenhum departamento foi encontrado.");
        }
        return departments.map(department => ({
            ...new list_department_dto_1.ListDepartmentDto(department),
            createdAt: department.createdAt?.toDateString(),
            updatedAt: department.updatedAt?.toDateString()
        }));
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: {
                id,
            }
        });
        if (department)
            return {
                ...new list_department_dto_1.ListDepartmentDto(department),
                createdAt: department.createdAt?.toDateString(),
                updatedAt: department.updatedAt?.toDateString()
            };
        throw new common_1.NotFoundException("Departamento não encontrado.");
    }
    async findUsersByDepartment(departmentId) {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
            relations: ['users'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Departamento com o ID ${departmentId} não foi encontrado.`);
        }
        return department.users.map(user => ({
            ...new list_user_dto_1.ListUserDto(user),
            createdAt: user.createdAt?.toDateString(),
            updatedAt: user.updatedAt?.toDateString()
        }));
    }
    async update(id, updateDepartmentDto) {
        if (Object.values(updateDepartmentDto).every(value => value === undefined)) {
            throw new common_1.BadRequestException('A requisição não pode estar vazia.');
        }
        const department = await this.departmentRepository.findOne({ where: { id } });
        if (!department) {
            throw new common_1.NotFoundException(`Departamento com o UUID ${id} não foi encontrado.`);
        }
        const updatedData = {
            ...updateDepartmentDto,
            updatedAt: new Date()
        };
        await this.departmentRepository.update(id, updatedData);
        const updatedDepartment = await this.departmentRepository.findOne({ where: { id } });
        if (!updatedDepartment) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar o departamento.');
        }
        return new list_department_dto_1.ListDepartmentDto(updatedDepartment);
    }
    async remove(id) {
        const department = await this.departmentRepository.findOne({
            where: {
                id
            }
        });
        if (!department) {
            throw new common_1.NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
        }
        return this.departmentRepository.delete(id);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map