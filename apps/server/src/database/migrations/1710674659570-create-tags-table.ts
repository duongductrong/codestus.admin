import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTagsTable1710674659570 implements MigrationInterface {
  name = "CreateTagsTable1710674659570"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`tags\` (
                \`tagId\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`name\` varchar(191) NOT NULL,
                \`slug\` varchar(191) NOT NULL,
                \`description\` text NULL,
                UNIQUE INDEX \`tags_slug_unique\` (\`slug\`),
                PRIMARY KEY (\`tagId\`)
            ) ENGINE = InnoDB
        `)

    await queryRunner.query(`
        ALTER TABLE \`tags\` ADD COLUMN \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    `)
    await queryRunner.query(`
        ALTER TABLE \`tags\` ADD COLUMN \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`tags\` DROP COLUMN \`updated_at\` timestamp(0) NULL
    `)
    await queryRunner.query(`
        ALTER TABLE \`tags\` DROP COLUMN \`created_at\` timestamp(0) NULL
    `)

    await queryRunner.query(`
            DROP INDEX \`tags_slug_unique\` ON \`tags\`
        `)
    await queryRunner.query(`
            DROP TABLE \`tags\`
        `)
  }
}
