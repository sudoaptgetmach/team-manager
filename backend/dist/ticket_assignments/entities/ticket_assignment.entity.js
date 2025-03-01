"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAssignment = void 0;
const class_validator_1 = require("class-validator");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let TicketAssignment = class TicketAssignment {
    id;
    ticketId;
    userId;
    assignedAt;
    updatedAt;
};
exports.TicketAssignment = TicketAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket),
    (0, typeorm_1.JoinColumn)({ name: "ticketId" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketAssignment.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketAssignment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketAssignment.prototype, "assignedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TicketAssignment.prototype, "updatedAt", void 0);
exports.TicketAssignment = TicketAssignment = __decorate([
    (0, typeorm_1.Entity)()
], TicketAssignment);
//# sourceMappingURL=ticket_assignment.entity.js.map