import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { IsString,IsNotEmpty, IsOptional } from "class-validator";


@Entity({name: "roles"})
export class Role{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255, unique: true, nullable: false})
    name!: string;

    @Column({type: "text", nullable: true})
    description?: string;
}