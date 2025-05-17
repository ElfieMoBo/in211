import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddUserMovie1747494820067 {
    name = 'AddUserMovie1747494820067'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "user_comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "user" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "user_comment" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "comment" character varying
        `);
    }
}
