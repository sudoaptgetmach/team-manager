import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ListDepartmentDto } from './dto/list-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { ListUserDto } from 'src/users/dto/list-user.dto';

@Injectable()
export class DepartmentsService {

  constructor(@InjectRepository(Department)
              private readonly departmentRepository: Repository<Department>) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
      const newDepartmentData = {
        name: createDepartmentDto.name,
      };
     
      const newDepartment = this.departmentRepository.create(newDepartmentData);
      await this.departmentRepository.save(newDepartment);
     
      return newDepartment;  
  }

  async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};
    
        const departments = await this.departmentRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'asc',
            },
        });
        if (!departments || departments.length === 0) {
            throw new NotFoundException("Nenhum departamento foi encontrado.");
        }
    
        return departments.map(department => ({
            ...new ListDepartmentDto(department),
            createdAt: department.createdAt?.toDateString(),
            updatedAt: department.updatedAt?.toDateString()
        }));
  }

  async findOne(id: UUID) {
         const department = await this.departmentRepository.findOne({
           where: {
            id,
           }  
        });
    
        if (department) return {
            ...new ListDepartmentDto(department),
            createdAt: department.createdAt?.toDateString(),
            updatedAt: department.updatedAt?.toDateString()
        };
    
        throw new NotFoundException("Departamento não encontrado.");
  }

  async findUsersByDepartment(departmentId: UUID) {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
      relations: ['users'],
    });

    if (!department) {
      throw new NotFoundException(`Departamento com o ID ${departmentId} não foi encontrado.`);
    }

    return department.users.map(user => ({ 
      ...new ListUserDto(user),
      createdAt: user.createdAt?.toDateString(),
      updatedAt: user.updatedAt?.toDateString()
    }));
  }

  async update(id: UUID, updateDepartmentDto: UpdateDepartmentDto) {
    if (Object.values(updateDepartmentDto).every(value => value === undefined)) {
        throw new BadRequestException('A requisição não pode estar vazia.');
    }
    
    const department = await this.departmentRepository.findOne({where: {id}});
    
    if (!department) {
        throw new NotFoundException(`Departamento com o UUID ${id} não foi encontrado.`);
    }
    
    const updatedData = {
        ...updateDepartmentDto,
        updatedAt: new Date()
    }
    
    await this.departmentRepository.update(id, updatedData);
    
    const updatedDepartment = await this.departmentRepository.findOne({where: {id}});
    
    if (!updatedDepartment) {
        throw new InternalServerErrorException('Erro ao atualizar o departamento.');
    }
    
    return new ListDepartmentDto(updatedDepartment);
  }

  async remove(id: UUID) {
    const department = await this.departmentRepository.findOne({
      where: {
          id
      }
    });

    if (!department) {
        throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
    }
    return this.departmentRepository.delete(id);
  }
}
