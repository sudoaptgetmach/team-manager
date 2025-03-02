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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const auth_token_guard_1 = require("../auth/guards/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const parse_uuid_pipe_1 = require("../common/pipes/parse-uuid.pipe");
const departments_service_1 = require("./departments.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
let DepartmentsController = class DepartmentsController {
    departmentsService;
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    create(createDepartmentDto, tokenPayload) {
        return this.departmentsService.create(createDepartmentDto, tokenPayload);
    }
    findAll(paginationDto) {
        return this.departmentsService.findAll(paginationDto);
    }
    async findOne(id) {
        return this.departmentsService.findOne(id);
    }
    findUsersByDepartment(id) {
        return this.departmentsService.findUsersByDepartment(id);
    }
    update(id, updateDepartmentDto, tokenPayloadDto) {
        return this.departmentsService.update(id, updateDepartmentDto, tokenPayloadDto);
    }
    remove(id) {
        return this.departmentsService.remove(id);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findUsersByDepartment", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, common_1.Controller)('departments'),
    (0, common_1.UsePipes)(parse_uuid_pipe_1.ValidateUuidPipe),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map