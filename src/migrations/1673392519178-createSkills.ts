import { MigrationInterface, QueryRunner } from "typeorm";

export class createSkills1673389830586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "skill" (name) VALUES ('Guitarrista')`
    );
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Baterista')`);
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Vocalista')`);
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Tecladista')`);
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Baixista')`);
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Violinista')`);
    await queryRunner.query(`INSERT INTO "skill" (name) VALUES ('Violonista')`);
    await queryRunner.query(
      `INSERT INTO "skill" (name) VALUES ('Saxofonista')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skill" ALTER COLUMN "name" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "skill" ALTER COLUMN "id" DROP DEFAULT`
    );
  }
}
