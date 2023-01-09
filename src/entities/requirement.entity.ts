import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Band from "./band.entity";

@Entity("requirement")
export default class Requirement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Band, (band) => band.requirement)
  @JoinTable({
    name: "band_requirement",
    joinColumn: {
      name: "band_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "requirement_id",
      referencedColumnName: "id",
    },
  })
  bands: Band[];

  @Column({ length: 50 })
  name: string;
}
