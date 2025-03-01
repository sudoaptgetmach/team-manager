import { UUID } from "crypto";
import { User } from "../../users/entities/user.entity";
export declare class Department {
    id: UUID;
    name: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
