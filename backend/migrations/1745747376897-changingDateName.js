import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ChangingDateName1745747376897 {
    name = 'ChangingDateName1745747376897'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME COLUMN "date" TO "release_date"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME COLUMN "release_date" TO "date"
        `);
    }
}
