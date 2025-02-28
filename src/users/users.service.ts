import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              @InjectRepository(Department)
              private readonly departmentRepository: Repository<Department>) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, departmentId } = createUserDto;
  
    const department = await this.departmentRepository.findOne({ where: { id: departmentId } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }
  
    const newUser = this.userRepository.create({
      name,
      email,
      password,
      department,
    });
  
    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

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

  async findOne(id: UUID) {
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

    if (user) return {
        ...new ListUserDto(user),
        department: user.department,
        createdAt: user.createdAt?.toDateString(),
        updatedAt: user.updatedAt?.toDateString()
    };

    throw new NotFoundException("Usuário não encontrado.");
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      if (Object.values(updateUserDto).every(value => value === undefined)) {
        throw new BadRequestException('A requisição não pode estar vazia.');
      }

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuário com o ID ${id} não foi encontrado.`);
      }

      let department: Department = user.department;
      if (updateUserDto.departmentId) {
        const foundDepartment = await this.departmentRepository.findOne({ where: { id: updateUserDto.departmentId } });
        if (!foundDepartment) {
          throw new NotFoundException(`Departamento com o ID ${updateUserDto.departmentId} não foi encontrado.`);
        }
        department = foundDepartment;
      }

      const updatedData = {
        ...updateUserDto,
        department: department || user.department,
        updatedAt: new Date(),
      };

      await this.userRepository.update(id, updatedData);

      const updatedUser = await this.userRepository.findOne({ where: { id } });

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

      throw new InternalServerErrorException("Um erro inesperado ocorreu.");
    }
  }

  async remove(id: UUID) {
    const user = await this.userRepository.findOne({
      where: {
          id
      }
    });

    if (!user) {
        throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
    }
    return this.userRepository.delete(id);
  }
}