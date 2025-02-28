import { IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class TicketAssignment {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @ManyToOne(() => Ticket)
    @JoinColumn({ name: "ticketId" })
    @IsUUID()
    ticketId: UUID;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    @IsUUID()
    userId: UUID;

    @CreateDateColumn()
    assignedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}