import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DepartmentsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule]
})
export class UsersModule {}


