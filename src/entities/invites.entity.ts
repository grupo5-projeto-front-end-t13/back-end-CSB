import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import User from "./user.entity";

@Entity("invites")
export default class Invites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  userIdReceive: User;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  userIdSend: User;
}
