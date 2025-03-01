"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTicketDto = void 0;
class ListTicketDto {
    id;
    title;
    description;
    status;
    priority;
    department;
    user;
    assignee;
    constructor(ticket, user, assignee, department) {
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
exports.ListTicketDto = ListTicketDto;
//# sourceMappingURL=list-ticket.dto.js.map