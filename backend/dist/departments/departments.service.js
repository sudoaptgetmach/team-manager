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
const department_entity_1 = require("./entities/department.entity");
const user_entity_1 = require("../users/entities/user.entity");
const user_roles_enum_1 = require("../users/enum/user-roles.enum");
const list_department_dto_1 = require("./dto/list-department.dto");
const list_user_dto_1 = require("../users/dto/list-user.dto");
let DepartmentsService = class DepartmentsService {
    userRepository;
    departmentRepository;
    constructor(userRepository, departmentRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }
    async create(createDepartmentDto, tokenPayload) {
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender)
            throw new common_1.BadRequestException("Unable to find sender");
        const newDepartmentData = {
            name: createDepartmentDto.name,
        };
        const newDepartment = this.departmentRepository.create(newDepartmentData);
        await this.departmentRepository.save(newDepartment);
        sender.department = newDepartment;
        sender.isOwner = true;
        await this.userRepository.save(sender);
        return newDepartment;
    }
    async update(id, updateDepartmentDto, tokenPayload) {
        if (Object.values(updateDepartmentDto).every(value => value === undefined)) {
            throw new common_1.BadRequestException('A requisição não pode estar vazia.');
        }
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender)
            throw new common_1.BadRequestException("Sender not found");
        const department = await this.departmentRepository.findOne({ where: { id } });
        if (!department) {
            throw new common_1.NotFoundException(`Departamento com o UUID ${id} não foi encontrado.`);
        }
        if (sender.role !== user_roles_enum_1.UserRoles.ADMIN && !sender.isOwner) {
            throw new common_1.ForbiddenException("Você não tem permissão pra fazer isso.");
        }
        let newOwner = await this.userRepository.findOneBy({ id: updateDepartmentDto.owner });
        if (newOwner && newOwner.department && newOwner.department.id !== department.id) {
            throw new common_1.BadRequestException("O novo dono da organização precisa ser membro dela.");
        }
        if (newOwner) {
            newOwner.isOwner = true;
            await this.userRepository.save(newOwner);
            sender.isOwner = false;
            await this.userRepository.save(sender);
        }
        const updatedData = {
            ...updateDepartmentDto,
            updatedAt: new Date(),
        };
        await this.departmentRepository.update(id, updatedData);
        const updatedDepartment = await this.departmentRepository.findOne({ where: { id } });
        if (!updatedDepartment) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar o departamento.');
        }
        return updatedDepartment;
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!department) {
            throw new common_1.NotFoundException("Departamento não encontrado.");
        }
        const owner = department.users.find(user => user.isOwner);
        return {
            ...department,
            owner,
        };
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
            updatedAt: department.updatedAt?.toDateString(),
        }));
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
            updatedAt: user.updatedAt?.toDateString(),
        }));
    }
    async remove(id) {
        const department = await this.departmentRepository.findOne({
            where: {
                id,
            },
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
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map