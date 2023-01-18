import { MigrationInterface, QueryRunner } from "typeorm"

export class addOnDeleteSkills1674049037492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE "user" ADD CONSTRAINT "FK_0e51e612eb9ed2fa5ac4f44c7e1" FOREIGN KEY ("skillsId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE "skills" ADD CONSTRAINT "FK_0e51e612eb9ed2fa5ac4f44c7e1" FOREIGN KEY ("skillsId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    }

}
