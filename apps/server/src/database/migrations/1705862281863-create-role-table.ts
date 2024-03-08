import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateRoleTable1705862281863 implements MigrationInterface {
  name = "CreateRoleTable1705862281863"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`privileges\` json NOT NULL,
                \`active\` tinyint NOT NULL DEFAULT 1,
                \`createdById\` varchar(36) NULL,
                UNIQUE INDEX \`REL_cec119ce18936c7b6c24142be3\` (\`createdById\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`roles\`
            ADD CONSTRAINT \`FK_cec119ce18936c7b6c24142be3e\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_cec119ce18936c7b6c24142be3e\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_cec119ce18936c7b6c24142be3\` ON \`roles\`
        `)
    await queryRunner.query(`
            DROP TABLE \`roles\`
        `)
  }
}
