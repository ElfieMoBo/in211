import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddingMovieColumns1745760921849 {
    name = 'AddingMovieColumns1745760921849'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "runtime" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "limited_age" boolean NOT NULL
        `);
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
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "limited_age"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "runtime"
        `);
    }
}
