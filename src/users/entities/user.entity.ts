import { Type } from "class-transformer";
import { IsEmail, IsUUID } from "class-validator";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { UserRoles } from "../enum/user-roles.enum";
import { Department } from "../../departments/entities/department.entity";
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

    @ManyToOne(() => Department, department => department.users, { onUpdate: "CASCADE" })
    @JoinColumn({ name: "department_id" })
    @IsUUID()
    department: Department;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}