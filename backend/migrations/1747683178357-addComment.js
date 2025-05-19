import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddComment1747683178357 {
    name = 'AddComment1747683178357'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "movie_id" character varying NOT NULL,
                "user_id" character varying NOT NULL,
                "user_pseudo" character varying NOT NULL,
                "comment" character varying,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
    }
}
