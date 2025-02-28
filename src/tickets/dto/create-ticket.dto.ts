import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";
import { UUID } from "crypto";
import { User } from "src/users/entities/user.entity";
import { Department } from "src/departments/entities/department.entity";

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsEnum(TicketPriority)
    priority: TicketPriority = TicketPriority.LOW;

    @IsUUID()
    @IsNotEmpty()
    department: Department;

    @IsUUID()
    @IsNotEmpty()
    user: User;

    @IsUUID()
    @IsNotEmpty()
    assignee: User;
}
