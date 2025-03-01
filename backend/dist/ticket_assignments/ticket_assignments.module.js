"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAssignmentsModule = void 0;
const common_1 = require("@nestjs/common");
const ticket_assignments_service_1 = require("./ticket_assignments.service");
const ticket_assignments_controller_1 = require("./ticket_assignments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_assignment_entity_1 = require("./entities/ticket_assignment.entity");
let TicketAssignmentsModule = class TicketAssignmentsModule {
};
exports.TicketAssignmentsModule = TicketAssignmentsModule;
exports.TicketAssignmentsModule = TicketAssignmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ticket_assignment_entity_1.TicketAssignment])],
        controllers: [ticket_assignments_controller_1.TicketAssignmentsController],
        providers: [ticket_assignments_service_1.TicketAssignmentsService],
        exports: [typeorm_1.TypeOrmModule]
    })
], TicketAssignmentsModule);
//# sourceMappingURL=ticket_assignments.module.js.map