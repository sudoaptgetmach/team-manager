"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        ttl: Number(process.env.JWT_TTL ?? '3600')
    };
});
//# sourceMappingURL=jwt.config.js.map