import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { DepartmentsModule } from './departments/departments.module';
import { TicketAssignmentsModule } from './ticket_assignments/ticket_assignments.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USERNAME,
        database: process.env.POSTGRES_NAME,
        password: process.env.POSTGRES_PASSWORD,
        autoLoadEntities: true,
        synchronize: true
    }),
    UsersModule, TicketsModule, DepartmentsModule, TicketAssignmentsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
