import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidateUuidPipe } from 'src/common/pipes/parse-uuid.pipe';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
@UsePipes(ValidateUuidPipe)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('/create')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Param() paginationDto: PaginationDto) {
    return this.departmentsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.departmentsService.findOne(id);
  }

  @Get(':id/users')
  findUsersByDepartment(@Param('id') id: UUID) {
    return this.departmentsService.findUsersByDepartment(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: UUID, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID) {
    return this.departmentsService.remove(id);
  }
}
