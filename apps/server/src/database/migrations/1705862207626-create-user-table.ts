import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1705862207626 implements MigrationInterface {
  name = "CreateUserTable1705862207626"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`users\` (
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`id\` varchar(36) NOT NULL,
            \`firstName\` varchar(255) NULL,
            \`lastName\` varchar(255) NULL,
            \`email\` varchar(255) NOT NULL,
            \`emailVerifiedAt\` datetime NULL,
            \`password\` varchar(255) NOT NULL,
            UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
            PRIMARY KEY (\`id\`)
        ) ENGINE = InnoDB
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
    `)
    await queryRunner.query(`
        DROP TABLE \`users\`
    `)
  }
}
