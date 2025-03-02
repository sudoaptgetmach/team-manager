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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("../departments/entities/department.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_config_1 = require("./config/jwt.config");
const hashing_service_1 = require("./hash/hashing.service");
let AuthService = class AuthService {
    userRepository;
    departmentRepository;
    hashingService;
    jwtConfiguration;
    jwtService;
    constructor(userRepository, departmentRepository, hashingService, jwtConfiguration, jwtService) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.hashingService = hashingService;
        this.jwtConfiguration = jwtConfiguration;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const { name, email, password, departmentId } = createUserDto;
        let department = undefined;
        if (departmentId) {
            const foundDepartment = await this.departmentRepository.findOne({
                where: { id: departmentId },
            });
            if (!foundDepartment) {
                throw new common_1.NotFoundException(`Department with ID ${departmentId} not found`);
            }
            department = foundDepartment;
        }
        else {
            const foundDepartment = await this.departmentRepository.findOne({
                where: { name: 'Placeholder' },
            });
            department = foundDepartment ?? undefined;
            if (!department) {
                throw new common_1.NotFoundException('Placeholder department not found');
            }
        }
        const passwordHash = await this.hashingService.hash(password);
        const newUser = this.userRepository.create({
            name,
            email,
            password: passwordHash,
            department,
        });
        try {
            await this.userRepository.save(newUser);
            return newUser;
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async login(loginDto) {
        let validPassword = false;
        let throwError = true;
        const user = await this.userRepository.findOneBy({
            email: loginDto.email,
        });
        if (user) {
            validPassword = await this.hashingService.compare(loginDto.password, user.password);
        }
        if (validPassword) {
            throwError = false;
            const accessToken = await this.jwtService.signAsync({
                sub: user?.id,
            }, {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.ttl,
            });
            return {
                message: `Usuário logado com sucesso.
                          Token: ${accessToken}`,
            };
        }
        if (throwError) {
            throw new common_1.UnauthorizedException('Invalid user or password.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(3, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        hashing_service_1.HashingService, void 0, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map