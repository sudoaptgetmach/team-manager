import { IsDate, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { Department } from "../../departments/entities/department.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @Column({ type: "varchar", length: 100 })
    @IsString()
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "enum", enum: TicketStatus, default: TicketStatus.OPEN })
    status: TicketStatus;

    @Column({ type: "enum", enum: TicketPriority, default: TicketPriority.LOW })
    priority: TicketPriority;

    @ManyToOne(() => Department)
    @JoinColumn({ name: "departmentId" })
    @IsUUID()
    department: Department;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    @IsUUID()
    user: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "assigneeId" })
    @IsUUID()
    assignee: User;

    @CreateDateColumn()
    openedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @IsDate()
    closedAt: Date;
}