import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {

    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    owner: UUID;

}
