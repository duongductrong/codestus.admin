import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePostToTagTable1710676303226 implements MigrationInterface {
  name = "CreatePostToTagTable1710676303226"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`post_to_tag\` (
                \`postId\` bigint UNSIGNED NOT NULL,
                \`tagId\` bigint UNSIGNED NOT NULL,
                INDEX \`IDX_524a7e518392c4d5ca1cdf4fa8\` (\`postId\`),
                INDEX \`IDX_9b387372f0d3dc529fc066eb38\` (\`tagId\`),
                PRIMARY KEY (\`postId\`, \`tagId\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`post_to_tag\`
            ADD CONSTRAINT \`FK_524a7e518392c4d5ca1cdf4fa86\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`postId\`) ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE \`post_to_tag\`
            ADD CONSTRAINT \`FK_9b387372f0d3dc529fc066eb38d\` FOREIGN KEY (\`tagId\`) REFERENCES \`tags\`(\`tagId\`) ON DELETE CASCADE ON UPDATE CASCADE
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`post_to_tag\` DROP FOREIGN KEY \`FK_9b387372f0d3dc529fc066eb38d\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`post_to_tag\` DROP FOREIGN KEY \`FK_524a7e518392c4d5ca1cdf4fa86\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_9b387372f0d3dc529fc066eb38\` ON \`post_to_tag\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_524a7e518392c4d5ca1cdf4fa8\` ON \`post_to_tag\`
        `)
    await queryRunner.query(`
            DROP TABLE \`post_to_tag\`
        `)
  }
}
