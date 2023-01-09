import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Band from "./band.entity";
import Musician from "./musician.entity";

@Entity("invites")
export default class Invites {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Band, (band) => band.invites)
  bandId: string;

  @ManyToOne(() => Musician, (musician) => musician.invites)
  musicianId: string;

  @Column({ default: false })
  isInviteBand: boolean;

  @Column({ default: false })
  isInviteMusician: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
