import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePostsTable1710674659572 implements MigrationInterface {
  name = "CreatePostsTable1710674659572"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`posts\` (
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`postId\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`title\` varchar(191) NOT NULL,
                \`views\` mediumint UNSIGNED NOT NULL,
                \`thumbnail\` text NULL,
                \`slug\` varchar(191) NOT NULL,
                \`description\` text NULL,
                \`content\` text NULL,
                \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1',
                \`publish_at\` timestamp NOT NULL,
                \`love\` mediumint UNSIGNED NOT NULL,
                \`unlove\` mediumint UNSIGNED NOT NULL,
                \`userId\` bigint UNSIGNED NULL,
                UNIQUE INDEX \`posts_slug_unique\` (\`slug\`),
                UNIQUE INDEX \`IDX_54ddf9075260407dcfdd724857\` (\`slug\`),
                PRIMARY KEY (\`postId\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`posts\`
            ADD CONSTRAINT \`posts_userid_foreign\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`posts\` DROP FOREIGN KEY \`posts_userid_foreign\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_54ddf9075260407dcfdd724857\` ON \`posts\`
        `)
    await queryRunner.query(`
            DROP INDEX \`posts_slug_unique\` ON \`posts\`
        `)
    await queryRunner.query(`
            DROP TABLE \`posts\`
        `)
  }
}
