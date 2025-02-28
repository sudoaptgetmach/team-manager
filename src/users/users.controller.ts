import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidateUuidPipe } from 'src/common/pipes/parse-uuid.pipe';
import { UUID } from 'crypto';

@Controller('users')
@UsePipes(ValidateUuidPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  findAll(@Param() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }
}
