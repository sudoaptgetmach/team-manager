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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const user_roles_enum_1 = require("../users/enum/user-roles.enum");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const auth_token_guard_1 = require("../auth/guards/auth-token.guard");
let CommentsService = class CommentsService {
    userRepository;
    ticketRepository;
    constructor(userRepository, ticketRepository) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }
    async create(createCommentDto, tokenPayload) {
        const sender = await this.userRepository.findOneBy({ id: tokenPayload.sub });
        if (!sender) {
            throw new common_1.InternalServerErrorException(`Unable to find sender.`);
        }
        if (sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException();
        }
        const ticket = await this.ticketRepository.findOneBy({ id: createCommentDto.ticketId });
        if (ticket?.department !== sender.department && sender.role !== user_roles_enum_1.UserRoles.ADMIN) {
            throw new common_1.UnauthorizedException('Você não pode criar um comentário num ticket que não é do seu departamento.');
        }
        const newMessage = {
            ...createCommentDto,
            userId: sender.id,
        };
        return newMessage;
    }
    findAll() {
        return `This action returns all comments`;
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map