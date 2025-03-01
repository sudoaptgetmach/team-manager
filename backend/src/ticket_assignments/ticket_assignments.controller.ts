import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketAssignmentsService } from './ticket_assignments.service';
import { CreateTicketAssignmentDto } from './dto/create-ticket_assignment.dto';
import { UpdateTicketAssignmentDto } from './dto/update-ticket_assignment.dto';

@Controller('ticket-assignments')
export class TicketAssignmentsController {
  constructor(private readonly ticketAssignmentsService: TicketAssignmentsService) {}

  @Post()
  create(@Body() createTicketAssignmentDto: CreateTicketAssignmentDto) {
    return this.ticketAssignmentsService.create(createTicketAssignmentDto);
  }

  @Get()
  findAll() {
    return this.ticketAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketAssignmentDto: UpdateTicketAssignmentDto) {
    return this.ticketAssignmentsService.update(+id, updateTicketAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketAssignmentsService.remove(+id);
  }
}
