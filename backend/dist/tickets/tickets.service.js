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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("../departments/entities/department.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const list_ticket_dto_1 = require("./dto/list-ticket.dto");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_status_enum_1 = require("./enums/ticket-status.enum");
let TicketsService = class TicketsService {
    ticketRepository;
    userRepository;
    departmentRepository;
    constructor(ticketRepository, userRepository, departmentRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }
    async create(createTicketDto) {
        const { title, description, priority, department, user, assignee } = createTicketDto;
        const userEntity = await this.userRepository.findOne({ where: { id: user }, relations: ['department'] });
        const assigneeEntity = await this.userRepository.findOne({ where: { id: assignee }, relations: ['department'] });
        if (!userEntity || !assigneeEntity) {
            throw new common_1.NotFoundException(`User with ID ${user} or assignee with ID ${assignee} not found`);
        }
        const departmentEntity = await this.departmentRepository.findOne({ where: { id: department } });
        if (!departmentEntity) {
            throw new common_1.NotFoundException(`Department with ID ${department} not found`);
        }
        if (userEntity.department.id !== departmentEntity.id || assigneeEntity.department.id !== departmentEntity.id) {
            throw new common_1.ConflictException('User and assignee must be in the same department');
        }
        const newTicket = this.ticketRepository.create({
            title,
            description,
            status: ticket_status_enum_1.TicketStatus.OPEN,
            priority,
            department: departmentEntity,
            user: userEntity,
            assignee: assigneeEntity,
        });
        await this.ticketRepository.save(newTicket);
        return new list_ticket_dto_1.ListTicketDto(newTicket, userEntity, assigneeEntity, departmentEntity);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};
        const tickets = await this.ticketRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'asc',
            },
            relations: ['department', 'user', 'assignee'],
            select: {
                department: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    name: true
                },
                assignee: {
                    id: true,
                    name: true
                }
            }
        });
        if (!tickets || tickets.length === 0) {
            throw new common_1.NotFoundException("Nenhum ticket foi encontrado.");
        }
        const ticketDtos = await Promise.all(tickets.map(async (ticket) => {
            const user = await this.userRepository.findOne({ where: { id: ticket.user.id } });
            const assignee = await this.userRepository.findOne({ where: { id: ticket.assignee.id } });
            const department = await this.departmentRepository.findOne({ where: { id: ticket.department.id } });
            if (!user || !assignee || !department) {
                throw new common_1.NotFoundException('User, assignee, or department not found');
            }
            return {
                ...new list_ticket_dto_1.ListTicketDto(ticket, user, assignee, department),
                openedAt: ticket.openedAt?.toDateString(),
                updatedAt: ticket.updatedAt?.toDateString()
            };
        }));
        return ticketDtos;
    }
    async findOne(id) {
        const ticket = await this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket com ID ${id} não foi encontrado.`);
        }
        const user = await this.userRepository.findOne({ where: { id: ticket.user.id } });
        const assignee = await this.userRepository.findOne({ where: { id: ticket.assignee.id } });
        const department = await this.departmentRepository.findOne({ where: { id: ticket.department.id } });
        if (!user || !assignee || !department) {
            throw new common_1.NotFoundException('User, assignee, or department not found');
        }
        return new list_ticket_dto_1.ListTicketDto(ticket, user, assignee, department);
    }
    async findUsers(id) {
        const ticket = await this.ticketRepository.findOne({ where: { id },
            relations: ['department', 'user', 'assignee'],
            select: {
                department: {
                    id: true,
                    name: true,
                },
                user: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
                assignee: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            }
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Unable to find ticket with UUID ${id}.`);
        }
        const user = ticket.user;
        const assignee = ticket.assignee;
        if (!user || !assignee) {
            throw new common_1.NotFoundException(`Unable to find User and/or Assignee.`);
        }
        return ticket;
    }
    async update(id, updateTicketDto) {
        if (Object.values(updateTicketDto).every(value => value === undefined)) {
            throw new common_1.BadRequestException('A requisição não pode estar vazia.');
        }
        const ticket = this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with UUID ${id} not found.`);
        }
        const newInfo = {
            ...updateTicketDto,
            updatedAt: new Date()
        };
        await this.ticketRepository.update(id, newInfo);
        const updatedTicket = await this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });
        if (!updatedTicket) {
            throw new common_1.InternalServerErrorException(`Error while updating ticket ${id}.`);
        }
        return new list_ticket_dto_1.ListTicketDto(updatedTicket, updatedTicket.user, updatedTicket.assignee, updatedTicket.department);
    }
    async remove(id) {
        const ticket = this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with UUID ${id} not found.`);
        }
        return this.ticketRepository.delete(id);
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map