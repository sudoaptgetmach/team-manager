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
exports.AuthTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth.constants");
const jwt_config_1 = require("../config/jwt.config");
let AuthTokenGuard = class AuthTokenGuard {
    jwtService;
    jwtConfiguration;
    constructor(jwtService, jwtConfiguration) {
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);
            request[auth_constants_1.REQUEST_TOKEN_PAYLOAD_KEY] = payload;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException('Unable to login.');
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const authorization = request.headers?.authorization;
        if (!authorization || typeof authorization !== 'string') {
            return;
        }
        return authorization.split(' ')[1];
    }
};
exports.AuthTokenGuard = AuthTokenGuard;
exports.AuthTokenGuard = AuthTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0])
], AuthTokenGuard);
//# sourceMappingURL=auth-token.guard.js.map