import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddUserDetails1747129905752 {
    name = 'AddUserDetails1747129905752'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastname" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstname"
        `);
    }
}
