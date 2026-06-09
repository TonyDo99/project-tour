import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1781013767011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- DATA DESTINATION
        insert into destinations (id, name, slug, description, country, city, is_popular, created_at, updated_at)
        values (1, 'Hong kong', '', 'Hong Kong travel', 'Hong Kong', 'Hong Kong', true, now(), now());


        -- DATA DESTINATION IMAGES
        insert into destination_images (id, image, caption, is_primary, display_order, created_at, destination_id)
        values (1, '/storage/hongkong1.png', 'Hong kong traveling', true, 1, now(), 1),
        (2, '/storage/hongkong2.png', 'Hong kong traveling 2', false, 2, now(), 1),
        (3, '/storage/hongkong3.png', 'Hong kong traveling 3', false, 3, now(), 1);

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE TABLE destination_images;
      DELETE TABLE destinations;
    `);
  }
}
