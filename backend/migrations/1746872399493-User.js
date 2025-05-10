import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class User1746872399493 {
    name = 'User1746872399493'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "pseudo" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_be726a825c7254f55be1540601a" UNIQUE ("pseudo")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "age" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "shadow" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "shadow"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "age"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_be726a825c7254f55be1540601a"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "pseudo"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
    }
}
