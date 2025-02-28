import { Module } from '@nestjs/common';
import { TicketAssignmentsService } from './ticket_assignments.service';
import { TicketAssignmentsController } from './ticket_assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketAssignment } from './entities/ticket_assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketAssignment])],
  controllers: [TicketAssignmentsController],
  providers: [TicketAssignmentsService],
  exports: [TypeOrmModule]
})
export class TicketAssignmentsModule {}
