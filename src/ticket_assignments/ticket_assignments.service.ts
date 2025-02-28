import { Injectable } from '@nestjs/common';
import { CreateTicketAssignmentDto } from './dto/create-ticket_assignment.dto';
import { UpdateTicketAssignmentDto } from './dto/update-ticket_assignment.dto';

@Injectable()
export class TicketAssignmentsService {
  create(createTicketAssignmentDto: CreateTicketAssignmentDto) {
    return 'This action adds a new ticketAssignment';
  }

  findAll() {
    return `This action returns all ticketAssignments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketAssignment`;
  }

  update(id: number, updateTicketAssignmentDto: UpdateTicketAssignmentDto) {
    return `This action updates a #${id} ticketAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketAssignment`;
  }
}
