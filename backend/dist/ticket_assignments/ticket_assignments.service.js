"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAssignmentsService = void 0;
const common_1 = require("@nestjs/common");
let TicketAssignmentsService = class TicketAssignmentsService {
    create(createTicketAssignmentDto) {
        return 'This action adds a new ticketAssignment';
    }
    findAll() {
        return `This action returns all ticketAssignments`;
    }
    findOne(id) {
        return `This action returns a #${id} ticketAssignment`;
    }
    update(id, updateTicketAssignmentDto) {
        return `This action updates a #${id} ticketAssignment`;
    }
    remove(id) {
        return `This action removes a #${id} ticketAssignment`;
    }
};
exports.TicketAssignmentsService = TicketAssignmentsService;
exports.TicketAssignmentsService = TicketAssignmentsService = __decorate([
    (0, common_1.Injectable)()
], TicketAssignmentsService);
//# sourceMappingURL=ticket_assignments.service.js.map