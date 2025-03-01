import { UUID } from "crypto";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @ManyToOne(() => Ticket)
    @JoinColumn({ name: "ticket_id" })
    @Column({ type: "uuid" })
    ticketId: UUID;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    @Column({ type: "uuid" })
    userId: UUID;

    @Column({ type: "text" })
    message: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}