import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddComment1746977738910 {
    name = 'AddComment1746977738910'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "comment" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "comment"
        `);
    }
}
