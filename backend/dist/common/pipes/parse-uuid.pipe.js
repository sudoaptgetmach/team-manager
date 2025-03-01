"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUuidPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class ValidateUuidPipe {
    transform(value, metadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value;
        }
        if (!(0, class_validator_1.isUUID)(value)) {
            throw new common_1.BadRequestException("ID should be an UUID.");
        }
        return value;
    }
}
exports.ValidateUuidPipe = ValidateUuidPipe;
//# sourceMappingURL=parse-uuid.pipe.js.map