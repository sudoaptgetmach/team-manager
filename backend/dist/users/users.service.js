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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_user_dto_1 = require("./dto/list-user.dto");
const user_entity_1 = require("./entities/user.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const hashing_service_1 = require("../auth/hash/hashing.service");
const user_roles_enum_1 = require("./enum/user-roles.enum");
let UsersService = class UsersService {
    hashingService;
    userRepository;
    departmentRepository;
    ticketRepository;
    constructor(hashingService, userRepository, departmentRepository, ticketRepository) {
        this.hashingService = hashingService;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.ticketRepository = ticketRepository;
    }
    async findAll(paginationDto, tokenPayload) {
        const { limit = 10, offset = 0 } = paginationDto || {};
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender) {
            throw new common_1.InternalServerErrorException(`Unable to find sender.`);
        }
        if (sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException();
        }
        const users = await this.userRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'asc',
            },
            relations: ['department'],
            select: {
                department: {
                    id: true,
                    name: true
                }
            }
        });
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException("Nenhum usuário foi encontrado.");
        }
        return users.map(user => ({
            ...new list_user_dto_1.ListUserDto(user),
            createdAt: user.createdAt?.toDateString(),
            updatedAt: user.updatedAt?.toDateString()
        }));
    }
    async findOne(id, tokenPayload) {
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender) {
            throw new common_1.InternalServerErrorException(`Unable to find sender.`);
        }
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['department'],
            select: {
                department: {
                    id: true,
                    name: true
                }
            }
        });
        if (sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException();
        }
        if (user)
            return {
                ...new list_user_dto_1.ListUserDto(user),
                department: user.department,
                createdAt: user.createdAt?.toDateString(),
                updatedAt: user.updatedAt?.toDateString()
            };
        throw new common_1.NotFoundException("Usuário não encontrado.");
    }
    async findTickets(id, tokenPayload) {
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender) {
            throw new common_1.InternalServerErrorException(`Unable to find sender.`);
        }
        const user = this.userRepository.findOne({ where: { id },
            relations: ['department', 'tickets'],
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                department: {
                    id: true,
                    name: true,
                },
            } });
        if (!user) {
            throw new common_1.NotFoundException(`User with UUID ${id} not found.`);
        }
        if (id !== tokenPayload.sub && sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException();
        }
        const tickets = await this.ticketRepository.createQueryBuilder('ticket')
            .leftJoinAndSelect('ticket.user', 'user')
            .leftJoinAndSelect('ticket.assignee', 'assignee')
            .where('ticket.user.id = :id OR ticket.assignee.id = :id', { id })
            .select([
            'ticket.id',
            'ticket.title',
            'ticket.description',
            'ticket.status',
            'ticket.priority',
            'user.id',
            'user.name',
            'assignee.id',
            'assignee.name',
        ])
            .getMany();
        if (tickets.length === 0) {
            throw new common_1.NotFoundException(`Unable to find tickets for user ${id}.`);
        }
        return {
            ...user,
            tickets,
        };
    }
    async update(id, updateUserDto, tokenPayload) {
        try {
            const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
            if (!sender) {
                throw new common_1.InternalServerErrorException(`Unable to find sender.`);
            }
            if (Object.values(updateUserDto).every(value => value === undefined)) {
                throw new common_1.BadRequestException('A requisição não pode estar vazia.');
            }
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`Usuário com o ID ${id} não foi encontrado.`);
            }
            if (user.id !== tokenPayload.sub && sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
                throw new common_1.UnauthorizedException();
            }
            const updatedData = {
                ...updateUserDto,
                updatedAt: new Date(),
            };
            let department = user.department;
            if (updateUserDto.department?.id) {
                const foundDepartment = await this.departmentRepository.findOne({ where: { id: updateUserDto.department.id } });
                if (!foundDepartment) {
                    throw new common_1.NotFoundException(`Departamento com o ID ${updateUserDto.department.id} não foi encontrado.`);
                }
                department = foundDepartment;
                updatedData['department'] = department;
            }
            if (updateUserDto?.password) {
                const password = await this.hashingService.hash(updateUserDto.password);
                updatedData['password'] = password;
            }
            await this.userRepository.update(id, updatedData);
            const updatedUser = await this.userRepository.findOne({ where: { id }, relations: ['department'] });
            if (!updatedUser) {
                throw new common_1.InternalServerErrorException('Erro ao atualizar o usuário.');
            }
            return new list_user_dto_1.ListUserDto(updatedUser);
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            if (e.code === '23505') {
                throw new common_1.ConflictException("O E-mail informado já está em uso.");
            }
            throw new common_1.InternalServerErrorException("Um erro inesperado ocorreu.\n" + e);
        }
    }
    async remove(id, tokenPayload) {
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender) {
            throw new common_1.InternalServerErrorException(`Unable to find sender.`);
        }
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
        }
        if (user.id !== tokenPayload.sub && sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException();
        }
        return this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(3, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [hashing_service_1.HashingService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map