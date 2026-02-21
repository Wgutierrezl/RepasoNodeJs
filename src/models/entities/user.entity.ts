import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { CreateDateColumn } from "typeorm";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;
  
  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({type: "boolean", default: true})
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}