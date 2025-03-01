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
exports.ListUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_roles_enum_1 = require("../enum/user-roles.enum");
const department_entity_1 = require("../../departments/entities/department.entity");
const class_transformer_1 = require("class-transformer");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
class ListUserDto {
    id;
    name;
    email;
    role;
    department;
    tickets;
    createdAt;
    updatedAt;
    constructor(user) {
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
exports.ListUserDto = ListUserDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListUserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ListUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_roles_enum_1.UserRoles),
    __metadata("design:type", String)
], ListUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], ListUserDto.prototype, "department", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ticket_entity_1.Ticket),
    __metadata("design:type", Array)
], ListUserDto.prototype, "tickets", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ListUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ListUserDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=list-user.dto.js.map