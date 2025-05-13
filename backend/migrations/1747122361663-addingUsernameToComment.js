import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddingUsernameToComment1747122361663 {
    name = 'AddingUsernameToComment1747122361663'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "user_comment" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "user_comment"
        `);
    }
}
