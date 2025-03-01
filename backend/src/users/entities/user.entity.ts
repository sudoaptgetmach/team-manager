import { Type } from "class-transformer";
import { IsEmail, IsUUID } from "class-validator";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "../../departments/entities/department.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { UUID } from "crypto";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 150, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "enum", enum: UserRoles, default: UserRoles.USER })
    role: UserRoles;

    @ManyToOne(() => Department, department => department.users, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "department_id" })
    @IsUUID()
    department: Department;

    @OneToMany(() => Ticket, ticket => ticket.user, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tickets: Ticket[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}