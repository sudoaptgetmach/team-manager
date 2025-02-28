import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { UsersModule } from 'src/users/users.module';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UsersModule, DepartmentsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TypeOrmModule]
})
export class TicketsModule {}
