import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidateUuidPipe } from 'src/common/pipes/parse-uuid.pipe';
import { UUID } from 'crypto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Controller('users')
@UsePipes(ValidateUuidPipe)
@UseGuards(AuthTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll(@Param() paginationDto: PaginationDto, 
          @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.usersService.findAll(paginationDto, tokenPayload);
  }

  @Get('/:id')
  findOne(@Param('id') id: UUID, 
          @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.usersService.findOne(id, tokenPayload);
  }

  @Get('/:id/tickets')
  findTickets(@Param('id') id: UUID, 
              @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.usersService.findTickets(id, tokenPayload);
  }

  @Patch('/update/:id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto, 
         @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.usersService.update(id, updateUserDto, tokenPayload);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.usersService.remove(id, tokenPayload);
  }
}
