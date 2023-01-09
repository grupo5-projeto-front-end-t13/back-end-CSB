import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Musician from "./musician.entity";

@Entity("skill")
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Musician, (musician) => musician.skills)
  @JoinTable({
    name: "musician_skill",
    joinColumn: {
      name: "musician_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "skill_id",
      referencedColumnName: "id",
    },
  })
  musicians: Musician[];

  @Column({ length: 50 })
  name: string;
}
