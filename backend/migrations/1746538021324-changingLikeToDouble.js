import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ChangingLikeToDouble1746538021324 {
    name = 'ChangingLikeToDouble1746538021324'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "like"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "like" double precision NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "like"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "like" integer NOT NULL
        `);
    }
}
