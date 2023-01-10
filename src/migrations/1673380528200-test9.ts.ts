import { MigrationInterface, QueryRunner } from "typeorm";

export class test9 implements MigrationInterface {
    name = 'test9.ts1673380528200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "type" character varying(50) NOT NULL, "bio" character varying(800), "state" character varying(2), "genre" character varying(50), "social_media" character varying(50), "image" character varying(400), "name" character varying(50) NOT NULL, "username" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdm" boolean NOT NULL DEFAULT false, "skillsId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userIdReceiveId" uuid, "userIdSendId" uuid, CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0e51e612eb9ed2fa5ac4f44c7e1" FOREIGN KEY ("skillsId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c" FOREIGN KEY ("userIdReceiveId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_4fa338634e67f072a3c70343a31" FOREIGN KEY ("userIdSendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_4fa338634e67f072a3c70343a31"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0e51e612eb9ed2fa5ac4f44c7e1"`);
        await queryRunner.query(`DROP TABLE "invites"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
