"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCryptService = void 0;
const bcrypt = require("bcryptjs");
class BCryptService {
    async hash(password) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
    async compare(password, passwordHash) {
        return bcrypt.compare(password, passwordHash);
    }
}
exports.BCryptService = BCryptService;
//# sourceMappingURL=bcrypt.service.js.map