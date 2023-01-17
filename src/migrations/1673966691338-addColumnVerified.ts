import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnVerified1673966691338 implements MigrationInterface {
    name = 'addColumnVerified1673966691338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_4fa338634e67f072a3c70343a31"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c" FOREIGN KEY ("userIdReceiveId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_4fa338634e67f072a3c70343a31" FOREIGN KEY ("userIdSendId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_4fa338634e67f072a3c70343a31"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_4fa338634e67f072a3c70343a31" FOREIGN KEY ("userIdSendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_38ae3f044c10a01fccdafeb4a6c" FOREIGN KEY ("userIdReceiveId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
