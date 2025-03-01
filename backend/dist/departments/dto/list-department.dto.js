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
exports.ListDepartmentDto = void 0;
const class_validator_1 = require("class-validator");
class ListDepartmentDto {
    id;
    name;
    users;
    createdAt;
    updatedAt;
    constructor(department) {
        this.id = department.id;
        this.name = department.name;
        this.users = department.users;
        this.createdAt = department.createdAt?.toDateString();
        this.updatedAt = department.updatedAt?.toDateString();
    }
}
exports.ListDepartmentDto = ListDepartmentDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListDepartmentDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ListDepartmentDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ListDepartmentDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=list-department.dto.js.map