import { BadRequestException, ConflictException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ListTicketDto } from './dto/list-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketStatus } from './enums/ticket-status.enum';

@Injectable()
export class TicketsService {

  constructor(@InjectRepository(Ticket)
              private ticketRepository: Repository<Ticket>,
              @InjectRepository(User) 
              private userRepository: Repository<User>,
              @InjectRepository(Department) 
              private departmentRepository: Repository<Department>) {}

  async create(createTicketDto: CreateTicketDto) {
    const { title, description, priority, department, user, assignee } = createTicketDto;
  
    const userEntity = await this.userRepository.findOne({ where: { id: user }, relations: ['department'] });
    const assigneeEntity = await this.userRepository.findOne({ where: { id: assignee }, relations: ['department'] });
    if (!userEntity || !assigneeEntity) {
      throw new NotFoundException(`User with ID ${user} or assignee with ID ${assignee} not found`);
    }
  
    const departmentEntity = await this.departmentRepository.findOne({ where: { id: department } });
    if (!departmentEntity) {
      throw new NotFoundException(`Department with ID ${department} not found`);
    }
  
    if (userEntity.department.id !== departmentEntity.id || assigneeEntity.department.id !== departmentEntity.id) {
      throw new ConflictException('User and assignee must be in the same department');
    }
  
    const newTicket = this.ticketRepository.create({
      title,
      description,
      status: TicketStatus.OPEN,
      priority,
      department: departmentEntity,
      user: userEntity,
      assignee: assigneeEntity,
    });
  
    await this.ticketRepository.save(newTicket);
    return new ListTicketDto(newTicket, userEntity, assigneeEntity, departmentEntity);
  }

  async findAll(paginationDto: PaginationDto) {
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
       }
    );

    if (!tickets || tickets.length === 0) {
        throw new NotFoundException("Nenhum ticket foi encontrado.");
    }
  
    const ticketDtos = await Promise.all(tickets.map(async (ticket) => {
      const user = await this.userRepository.findOne({ where: { id: ticket.user.id } });
      const assignee = await this.userRepository.findOne({ where: { id: ticket.assignee.id } });
      const department = await this.departmentRepository.findOne({ where: { id: ticket.department.id } });
  
      if (!user || !assignee || !department) {
        throw new NotFoundException('User, assignee, or department not found');
      }
  
      return {
        ...new ListTicketDto(ticket, user, assignee, department),
        openedAt: ticket.openedAt?.toDateString(),
        updatedAt: ticket.updatedAt?.toDateString()
      };
    }));
  
    return ticketDtos;
  }

  async findOne(id: UUID) {
    const ticket = await this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });
  
    if (!ticket) {
      throw new NotFoundException(`Ticket com ID ${id} não foi encontrado.`);
    }
  
    const user = await this.userRepository.findOne({ where: { id: ticket.user.id } });
    const assignee = await this.userRepository.findOne({ where: { id: ticket.assignee.id } });
    const department = await this.departmentRepository.findOne({ where: { id: ticket.department.id } });

    if (!user || !assignee || !department) {
      throw new NotFoundException('User, assignee, or department not found');
    }

    return new ListTicketDto(ticket, user, assignee, department);
  }

  async findUsers(id: UUID) {
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
      throw new NotFoundException(`Unable to find ticket with UUID ${id}.`);
    }

    const user = ticket.user;
    const assignee = ticket.assignee;

    if (!user || !assignee) {
      throw new NotFoundException(`Unable to find User and/or Assignee.`);
    }

    return ticket;
  }

  async update(id: UUID, updateTicketDto: UpdateTicketDto) {
    if (Object.values(updateTicketDto).every(value => value === undefined)) {
        throw new BadRequestException('A requisição não pode estar vazia.');
    }

    const ticket = this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });

    if (!ticket) {
      throw new NotFoundException(`Ticket with UUID ${id} not found.`);
    }

    const newInfo = {
      ...updateTicketDto,
      updatedAt: new Date()
    }

    await this.ticketRepository.update(id, newInfo);

    const updatedTicket = await this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });

    if (!updatedTicket) {
        throw new InternalServerErrorException(`Error while updating ticket ${id}.`);
    }

    return new ListTicketDto(updatedTicket, updatedTicket.user, updatedTicket.assignee, updatedTicket.department);
  }

  async remove(id: UUID) {
    const ticket = this.ticketRepository.findOne({ where: { id }, relations: ['department', 'user', 'assignee'] });

    if (!ticket) {
      throw new NotFoundException(`Ticket with UUID ${id} not found.`);
    }

    return this.ticketRepository.delete(id);
  }
}
