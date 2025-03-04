import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1740710686800 implements MigrationInterface {
    name = 'FirstMigration1740710686800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
    }

}
