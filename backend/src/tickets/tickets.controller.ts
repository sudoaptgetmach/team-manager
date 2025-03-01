import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@Controller('tickets')
@UseGuards(AuthTokenGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('/create')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get('/list')
  findAll(@Param() paginationDto: PaginationDto) {
    return this.ticketsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.ticketsService.findOne(id);
  }

  @Get(':id/users')
  findUsers(@Param('id') id: UUID) {
    return this.ticketsService.findUsers(id);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: UUID, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID) {
    return this.ticketsService.remove(id);
  }
}
