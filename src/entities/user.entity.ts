import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Invites from "./invites.entity";
// import Invites from "./invites.entity";
import Skill from "./skill.entity";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 800, nullable: true })
  bio: string;

  @Column({ length: 2, nullable: true })
  state: string;

  @Column({ length: 50, nullable: true })
  genre: string;

  @Column({ length: 50, nullable: true })
  social_media: string;

  @Column({ length: 400, nullable: true })
  image: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, nullable: true })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => Skill)
  skills: Skill;

  @OneToMany(() => Invites, (invite) => invite.userIdReceive)
  invitesReceiver: Invites[];

  @OneToMany(() => Invites, (invite) => invite.userIdSend)
  invitesSend: Invites[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) this.password = hashSync(this.password, 10);
  }
}
