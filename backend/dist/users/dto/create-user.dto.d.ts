import { UUID } from "crypto";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    departmentId: UUID;
}
