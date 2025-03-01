"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPayloadParam = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../auth.constants");
exports.TokenPayloadParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const context = ctx.switchToHttp();
    const request = context.getRequest();
    return request[auth_constants_1.REQUEST_TOKEN_PAYLOAD_KEY];
});
//# sourceMappingURL=token-payload.param.js.map