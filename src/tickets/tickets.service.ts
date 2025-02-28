import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.userRepository.findOne({ where: { id: createTicketDto.user.id }, relations: ['department'] });
    const assignee = await this.userRepository.findOne({ where: { id: createTicketDto.assignee.id }, relations: ['department'] });
    if (!user || !assignee) {
      throw new NotFoundException(`User with ID ${createTicketDto.user.id} or assignee with ID ${createTicketDto.user.id} not found`);
    }
  
    const department = await this.departmentRepository.findOne({ where: { id: createTicketDto.department.id } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${createTicketDto.department.id} not found`);
    }
    
    if (user.department.id !== department.id || assignee.department.id !== department.id) {
      throw new ConflictException('User and assignee must be in the same department');
    }
  
    const newTicket = this.ticketRepository.create({
      ...createTicketDto,
      status: TicketStatus.OPEN,
      department,
      user,
      assignee,
    });
  
    await this.ticketRepository.save(newTicket);
    return new ListTicketDto(newTicket, user, assignee, department);
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

  update(id: UUID, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: UUID) {
    return `This action removes a #${id} ticket`;
  }
}
