import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UserRoles } from 'src/users/enum/user-roles.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ListDepartmentDto } from './dto/list-department.dto';
import { ListUserDto } from 'src/users/dto/list-user.dto';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto, tokenPayload: TokenPayloadDto) {
    const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });

    if (!sender) throw new BadRequestException("Unable to find sender");

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

  async update(id: UUID, updateDepartmentDto: UpdateDepartmentDto, tokenPayload: TokenPayloadDto) {
    if (Object.values(updateDepartmentDto).every(value => value === undefined)) {
      throw new BadRequestException('A requisição não pode estar vazia.');
    }

    const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
    if (!sender) throw new BadRequestException("Sender not found");

    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`Departamento com o UUID ${id} não foi encontrado.`);
    }

    if (sender.role !== UserRoles.ADMIN && !sender.isOwner) {
      throw new ForbiddenException("Você não tem permissão pra fazer isso.");
    }

    let newOwner = await this.userRepository.findOneBy({ id: updateDepartmentDto.owner });
    if (newOwner && newOwner.department && newOwner.department.id !== department.id) {
      throw new BadRequestException("O novo dono da organização precisa ser membro dela.");
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
      throw new InternalServerErrorException('Erro ao atualizar o departamento.');
    }

    return updatedDepartment;
  }

  async findOne(id: UUID) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!department) {
      throw new NotFoundException("Departamento não encontrado.");
    }

    const owner = department.users.find(user => user.isOwner);

    return {
      ...department,
      owner,
    };
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
      updatedAt: department.updatedAt?.toDateString(),
    }));
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
      updatedAt: user.updatedAt?.toDateString(),
    }));
  }

  async remove(id: UUID) {
    const department = await this.departmentRepository.findOne({
      where: {
        id,
      },
    });

    if (!department) {
      throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
    }
    return this.departmentRepository.delete(id);
  }
}