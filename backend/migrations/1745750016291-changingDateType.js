import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ChangingDateType1745750016291 {
    name = 'ChangingDateType1745750016291'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "release_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "release_date" TIMESTAMP NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "release_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "release_date" character varying NOT NULL
        `);
    }
}
