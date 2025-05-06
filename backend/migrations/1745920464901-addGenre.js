import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddGenre1745920464901 {
    name = 'AddGenre1745920464901'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "poster_path" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "like" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "genre_id1" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "genre_id2" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "genre_id3" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "genre_id4" integer NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "genre_id4"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "genre_id3"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "genre_id2"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "genre_id1"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "like"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "poster_path"
        `);
    }
}
