"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketAssignmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ticket_assignment_dto_1 = require("./create-ticket_assignment.dto");
class UpdateTicketAssignmentDto extends (0, mapped_types_1.PartialType)(create_ticket_assignment_dto_1.CreateTicketAssignmentDto) {
}
exports.UpdateTicketAssignmentDto = UpdateTicketAssignmentDto;
//# sourceMappingURL=update-ticket_assignment.dto.js.map