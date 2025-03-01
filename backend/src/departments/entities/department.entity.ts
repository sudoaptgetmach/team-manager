import { IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Department {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @Column({ type: "varchar", length: 100 })
    @IsString()
    name: string;

    @OneToMany(() => User, user => user.department, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}