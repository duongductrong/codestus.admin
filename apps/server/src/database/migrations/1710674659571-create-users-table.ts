import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1710674659571 implements MigrationInterface {
  name = "CreateUsersTable1710674659571"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`users\` (
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`userId\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            \`name\` varchar(191) NULL,
            \`email\` varchar(191) NOT NULL,
            \`email_verified_at\` timestamp NULL,
            \`remember_token\` varchar(100) NULL,
            \`provider\` varchar(191) NULL,
            \`provider_id\` varchar(191) NULL,
            \`avatar\` varchar(255) NULL,
            \`password\` varchar(191) NOT NULL,
            UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
            PRIMARY KEY (\`userId\`)
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
