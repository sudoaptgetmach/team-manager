import { CreateDepartmentDto } from './create-department.dto';
import { UUID } from 'crypto';
declare const UpdateDepartmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDepartmentDto>>;
export declare class UpdateDepartmentDto extends UpdateDepartmentDto_base {
    owner: UUID;
}
export {};
