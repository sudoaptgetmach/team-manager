import { UUID } from "crypto";
import { Department } from "src/departments/entities/department.entity";
import { User } from "src/users/entities/user.entity";
import { Ticket } from "../entities/ticket.entity";

export class ListTicketDto {
    id: UUID;
    title: string;
    description: string;
    status: string;
    priority: string;
    department: string;
    user: string;
    assignee: string;
  
    constructor(ticket: Ticket, user: User, assignee: User, department: Department) {
      this.id = ticket.id;
      this.title = ticket.title;
      this.description = ticket.description;
      this.status = ticket.status.toString();
      this.priority = ticket.priority;
      this.department = department.name;
      this.user = user.name || "null";
      this.assignee = assignee.name;
    }
}