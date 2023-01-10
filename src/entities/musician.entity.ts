import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Invites from "./invites.entity";
import Skill from "./skill.entity";

@Entity("musician")
export default class Musician {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50,  nullable: true})
  username: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 800, nullable: true })
  bio: string;

  @Column({ length: 2, nullable: true })
  state: string;

  @ManyToMany(() => Skill, (skill) => skill.musicians)
  skills: Skill[];

  @Column({ length: 20, nullable: true })
  skill_level: string;

  @Column({ length: 50, nullable: true })
  social_media: string;

  @Column({ length: 400, nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Invites, (invite) => invite.musicianId)
  invites: Invites[];

  @Column({ default: false })
  isAdm: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) this.password = hashSync(this.password, 10);
  }
}
