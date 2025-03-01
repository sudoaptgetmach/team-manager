import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { HashingService } from 'src/auth/hash/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UserRoles } from './enum/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(private readonly hashingService: HashingService,
              @InjectRepository(User)
              private readonly userRepository: Repository<User>,
              @InjectRepository(Department)
              private readonly departmentRepository: Repository<Department>,
              @InjectRepository(Ticket)
              private readonly ticketRepository: Repository<Ticket>) {}

  async findAll(paginationDto: PaginationDto, tokenPayload: TokenPayloadDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

    const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });

    if (!sender) {
        throw new InternalServerErrorException(`Unable to find sender.`);
    }

    if (sender.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException();
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
        throw new NotFoundException("Nenhum usuário foi encontrado.");
    }

    return users.map(user => ({
        ...new ListUserDto(user),
        createdAt: user.createdAt?.toDateString(),
        updatedAt: user.updatedAt?.toDateString()
    }));
  }

  async findOne(id: UUID, tokenPayload: TokenPayloadDto) {

    const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });

    if (!sender) {
        throw new InternalServerErrorException(`Unable to find sender.`);
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

    if (sender.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException();
    }

    if (user) return {
        ...new ListUserDto(user),
        department: user.department,
        createdAt: user.createdAt?.toDateString(),
        updatedAt: user.updatedAt?.toDateString()
    };

    throw new NotFoundException("Usuário não encontrado.");
  }

  async findTickets(id: UUID, tokenPayload: TokenPayloadDto) {

    const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });

    if (!sender) {
        throw new InternalServerErrorException(`Unable to find sender.`);
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
    }});

    if (!user) {
      throw new NotFoundException(`User with UUID ${id} not found.`);
    }

    if (id !== tokenPayload.sub && sender.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException();
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
      throw new NotFoundException(`Unable to find tickets for user ${id}.`)
    }

    return {
      ...user,
      tickets,
    };
  }

  async update(id: UUID, updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto) {
    try {
      const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });

      if (!sender) {
          throw new InternalServerErrorException(`Unable to find sender.`);
      }

      if (Object.values(updateUserDto).every(value => value === undefined)) {
        throw new BadRequestException('A requisição não pode estar vazia.');
      }

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuário com o ID ${id} não foi encontrado.`);
      }

      if (user.id !== tokenPayload.sub && sender.role !== UserRoles.ADMIN) {
        throw new UnauthorizedException();
      }

      let department: Department = user.department;
      if (updateUserDto.department?.id) {
        const foundDepartment = await this.departmentRepository.findOne({ where: { id: updateUserDto.department.id } });
        if (!foundDepartment) {
          throw new NotFoundException(`Departamento com o ID ${updateUserDto.department.id} não foi encontrado.`);
        }
        department = foundDepartment;
      }

      const updatedData = {
        ...updateUserDto,
        department: department || user.department,
        updatedAt: new Date(),
      };

      if (updateUserDto?.password) {
        const password = await this.hashingService.hash(
          updateUserDto.password,
        );

        updatedData['password'] = password;
      }

      await this.userRepository.update(id, updatedData);

      const updatedUser = await this.userRepository.findOne({ where: { id }, relations: ['department'] });

      if (!updatedUser) {
        throw new InternalServerErrorException('Erro ao atualizar o usuário.');
      }

      return new ListUserDto(updatedUser);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      if (e.code === '23505') {
        throw new ConflictException("O E-mail informado já está em uso.");
      }

      throw new InternalServerErrorException("Um erro inesperado ocorreu.\n" + e);
    }
  }

  async remove(id: UUID, tokenPayload: TokenPayloadDto) {

    const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });

    if (!sender) {
        throw new InternalServerErrorException(`Unable to find sender.`);
    }

    const user = await this.userRepository.findOne({
      where: {
          id
      }
    });

    if (!user) {
        throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
    }

    if (user.id !== tokenPayload.sub && sender.role !== UserRoles.ADMIN) {
        throw new UnauthorizedException();
    }

    return this.userRepository.delete(id);
  }
}