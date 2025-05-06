import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class NewTableGenre1746100161176 {
    name = 'NewTableGenre1746100161176'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name"),
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }
}
