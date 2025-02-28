import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Department } from '../departments/entities/department.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Department, Ticket]),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => TicketsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}