import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1781489010677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        -- CREATE USERS
        insert into users (id, email, password, full_name, phone, avatar, status, is_email_verified, email_verified_at,
                            date_of_birth, address, google_id, created_at, updated_at)
        values (1, 'an@gmail.com', '123', 'Nguyen Thanh An', '+84742931734', '/avatar/an.png', 'ACTIVE', true, now(), now(),
                 'TPHCM', 'an@gmail.com', now(), now());


        -- CREATE ROLES
        insert into public.roles (id, code, name, display_name, description, is_read_only, created_at, updated_at,
                                   created_by_id, updated_by_id)
        values (1, 100, 'ADMIN', 'Administrator', 'Administrator management system', false, now(), now(), 1, 1);


        -- CREATE ROLES
        insert into public.user_to_role(user_id, role_id, created_at, updated_at) values (1, 1, now(), now());
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        delete from public.user_to_role;
        delete from public.users;
        delete from public.roles;
      `,
    );
  }
}
