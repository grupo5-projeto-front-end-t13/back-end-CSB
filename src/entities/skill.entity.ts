import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("skill")
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;
}
