import { MigrationInterface, QueryRunner } from "typeorm";

export class testingEntities1673293740630 implements MigrationInterface {
    name = 'testingEntities1673293740630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musician" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "bio" character varying(800), "state" character varying(2), "skill_level" character varying(20), "social_media" character varying(50), "image" character varying(400), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_07af80ab6b55fae1fd4dc191d64" UNIQUE ("email"), CONSTRAINT "PK_4882f033208324a695dd353f2ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isInviteBand" boolean NOT NULL DEFAULT false, "isInviteMusician" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bandIdId" uuid, "musicianIdId" uuid, CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requirement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_5e3278ee8e2094dd0f10a4aec62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "band" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "bio" character varying(800), "state" character varying(2), "genre" character varying(50), "social_media" character varying(50), "image" character varying(400), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_7bee5c906643f227555f8fe035f" UNIQUE ("email"), CONSTRAINT "PK_e808d7dacf72163737ce93d7b23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musician_skill" ("musician_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "PK_163eb6815a00295e4a5ef6d5c55" PRIMARY KEY ("musician_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54d46351e5b36c71c04e756590" ON "musician_skill" ("musician_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_67dfeb8dae5f4021615bbeb30b" ON "musician_skill" ("skill_id") `);
        await queryRunner.query(`CREATE TABLE "band_requirement" ("band_id" uuid NOT NULL, "requirement_id" uuid NOT NULL, CONSTRAINT "PK_279b6b10fcac1b0085307409d96" PRIMARY KEY ("band_id", "requirement_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4754cff13413d342522db25df5" ON "band_requirement" ("band_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a17e46ad831030c5456e430579" ON "band_requirement" ("requirement_id") `);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_48a343a59d2f018565b310bf146" FOREIGN KEY ("bandIdId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_8167a77916cb7e84bf7c53dff22" FOREIGN KEY ("musicianIdId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musician_skill" ADD CONSTRAINT "FK_54d46351e5b36c71c04e7565905" FOREIGN KEY ("musician_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "musician_skill" ADD CONSTRAINT "FK_67dfeb8dae5f4021615bbeb30b8" FOREIGN KEY ("skill_id") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "band_requirement" ADD CONSTRAINT "FK_4754cff13413d342522db25df53" FOREIGN KEY ("band_id") REFERENCES "requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "band_requirement" ADD CONSTRAINT "FK_a17e46ad831030c5456e4305795" FOREIGN KEY ("requirement_id") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "band_requirement" DROP CONSTRAINT "FK_a17e46ad831030c5456e4305795"`);
        await queryRunner.query(`ALTER TABLE "band_requirement" DROP CONSTRAINT "FK_4754cff13413d342522db25df53"`);
        await queryRunner.query(`ALTER TABLE "musician_skill" DROP CONSTRAINT "FK_67dfeb8dae5f4021615bbeb30b8"`);
        await queryRunner.query(`ALTER TABLE "musician_skill" DROP CONSTRAINT "FK_54d46351e5b36c71c04e7565905"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_8167a77916cb7e84bf7c53dff22"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_48a343a59d2f018565b310bf146"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a17e46ad831030c5456e430579"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4754cff13413d342522db25df5"`);
        await queryRunner.query(`DROP TABLE "band_requirement"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67dfeb8dae5f4021615bbeb30b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54d46351e5b36c71c04e756590"`);
        await queryRunner.query(`DROP TABLE "musician_skill"`);
        await queryRunner.query(`DROP TABLE "band"`);
        await queryRunner.query(`DROP TABLE "requirement"`);
        await queryRunner.query(`DROP TABLE "invites"`);
        await queryRunner.query(`DROP TABLE "musician"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
