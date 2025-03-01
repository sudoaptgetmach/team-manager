import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "src/departments/entities/department.entity";
import { Type } from "class-transformer";
import { TicketsController } from "src/tickets/tickets.controller";
import { Ticket } from "src/tickets/entities/ticket.entity";

export class ListUserDto {
    @IsUUID()
    id: UUID;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRoles)
    role: UserRoles;

    @IsNotEmpty()
    @Type(() => Department)
    department: Department;

    @Type(() => Ticket)
    tickets: Ticket[];

    @IsDate()
    createdAt: string;

    @IsDate()
    updatedAt: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.department = user.department;
        this.tickets = user.tickets;
        this.createdAt = new Date(user.createdAt).toDateString();
        this.updatedAt = new Date(user.updatedAt).toDateString();
    }
}