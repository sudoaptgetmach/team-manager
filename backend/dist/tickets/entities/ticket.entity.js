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
exports.Ticket = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
const department_entity_1 = require("../../departments/entities/department.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Ticket = class Ticket {
    id;
    title;
    description;
    status;
    priority;
    department;
    user;
    assignee;
    openedAt;
    updatedAt;
    closedAt;
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ticket_status_enum_1.TicketStatus, default: ticket_status_enum_1.TicketStatus.OPEN }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ticket_priority_enum_1.TicketPriority, default: ticket_priority_enum_1.TicketPriority.LOW }),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { onUpdate: "CASCADE", onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "departmentId" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", department_entity_1.Department)
], Ticket.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onUpdate: "CASCADE", onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onUpdate: "CASCADE", onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "assigneeId" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ticket.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)()
], Ticket);
//# sourceMappingURL=ticket.entity.js.map