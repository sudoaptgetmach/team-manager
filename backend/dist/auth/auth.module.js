"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("./hash/hashing.service");
const bcrypt_service_1 = require("./hash/bcrypt.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_config_1 = require("./config/jwt.config");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const departments_service_1 = require("../departments/departments.service");
const department_entity_1 = require("../departments/entities/department.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, department_entity_1.Department]),
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider())],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BCryptService
            },
            auth_service_1.AuthService,
            departments_service_1.DepartmentsService
        ],
        exports: [hashing_service_1.HashingService, auth_service_1.AuthService, jwt_1.JwtModule, config_1.ConfigModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map