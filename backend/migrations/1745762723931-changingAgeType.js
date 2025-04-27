import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ChangingAgeType1745762723931 {
    name = 'ChangingAgeType1745762723931'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "limited_age"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "limited_age" integer NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "limited_age"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "limited_age" boolean NOT NULL
        `);
    }
}
