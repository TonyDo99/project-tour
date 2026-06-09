import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1781010371422 implements MigrationInterface {
  name = 'Seeding1781010371422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "destination_images" ("id" SERIAL NOT NULL, "image" character varying(500) NOT NULL, "caption" character varying(255), "is_primary" boolean NOT NULL DEFAULT false, "display_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "destination_id" integer, CONSTRAINT "PK_b5f3c336fc65b76734af31b77c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "destinations" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "description" text, "country" character varying(100), "city" character varying(100), "is_popular" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30864aeaf404f4a6d3f816bd8c5" UNIQUE ("slug"), CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tour_schedules" ("id" SERIAL NOT NULL, "departure_date" date NOT NULL, "return_date" date NOT NULL, "available_slots" integer NOT NULL, "price" numeric(10,2) NOT NULL, "booked_slots" integer NOT NULL DEFAULT '0', "status" character varying(20) NOT NULL DEFAULT 'available', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tour_id" integer, CONSTRAINT "PK_89d2bd2473ccd28aef4ebee3f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5fe6cc04e62bd2a456fbbac82d" ON "tour_schedules"  ("tour_id", "departure_date") `,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "title" character varying(255), "comment" text, "organization_rating" integer, "service_rating" integer, "value_rating" integer, "images" text, "is_verified" boolean NOT NULL DEFAULT false, "is_approved" boolean NOT NULL DEFAULT true, "admin_response" text, "response_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tour_id" integer, "user_id" integer, "booking_id" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2c5773ff995ca1184399289d84" ON "reviews"  ("booking_id", "user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tours" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "description" text NOT NULL, "duration_days" integer NOT NULL, "duration_nights" integer NOT NULL, "max_participants" integer NOT NULL, "min_participants" integer NOT NULL DEFAULT '1', "price" numeric(10,2) NOT NULL, "category" character varying(50), "itinerary" json, "meeting_point" character varying(255), "departure_location" character varying(255), "return_location" character varying(255), "cancellation_policy" text, "rating" numeric(3,2) NOT NULL DEFAULT '0', "total_reviews" integer NOT NULL DEFAULT '0', "status" character varying(20) NOT NULL DEFAULT 'active', "is_featured" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "destination_id" integer, "tour_guide_id" integer, CONSTRAINT "UQ_233c6bf8b7c2c897c6eed5373a6" UNIQUE ("slug"), CONSTRAINT "PK_2202ba445792c1ad0edf2de8de2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tour_guides" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "phone" character varying(20), "email" character varying(255), "languages" text, "experience_years" integer NOT NULL DEFAULT '0', "bio" text, "avatar" character varying(500), "rating" numeric(3,2) NOT NULL DEFAULT '0', "total_tours_completed" integer NOT NULL DEFAULT '0', "is_available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_e86bdf0d1c89c8f549523fa1070" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "full_name" character varying(255) NOT NULL, "phone" character varying(20), "avatar" character varying(500), "status" character varying(20) NOT NULL DEFAULT 'pending', "is_email_verified" boolean NOT NULL DEFAULT false, "email_verified_at" TIMESTAMP, "date_of_birth" date, "address" text, "google_id" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "payment_method" character varying(50) NOT NULL, "payment_gateway" character varying(50), "transaction_id" character varying(255), "amount" numeric(10,2) NOT NULL, "currency" character varying(10) NOT NULL DEFAULT 'VND', "status" character varying(20) NOT NULL DEFAULT 'pending', "payment_date" TIMESTAMP, "payment_details" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "booking_id" integer, CONSTRAINT "UQ_3c324ca49dabde7ffc0ef64675d" UNIQUE ("transaction_id"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "booking_code" character varying(50) NOT NULL, "customer_name" character varying(255) NOT NULL, "customer_email" character varying(255) NOT NULL, "customer_phone" character varying(20) NOT NULL, "customer_address" text, "price" numeric(10,2) NOT NULL, "total_participants" integer NOT NULL, "subtotal" numeric(10,2) NOT NULL, "discount_amount" numeric(10,2) NOT NULL DEFAULT '0', "total_amount" numeric(10,2) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'pending', "payment_status" character varying(20) NOT NULL DEFAULT 'unpaid', "special_requests" text, "notes" text, "cancelled_at" TIMESTAMP, "cancellation_reason" text, "confirmed_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "tour_id" integer, "cancelled_by" integer, "confirmed_by" integer, CONSTRAINT "UQ_796e0227e4beff186bdd72ac53b" UNIQUE ("booking_code"), CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking_participants" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "date_of_birth" date, "gender" character varying(10), "passport_number" character varying(50), "special_requirements" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "booking_id" integer, CONSTRAINT "PK_9cc32a61bd698b5831f4e5d66e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "features" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, "description" text, "type" character varying(20) NOT NULL DEFAULT 'FEATURE', "parent_id" character varying(36), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" integer, "updated_by_id" integer, CONSTRAINT "UQ_c0e1f5d0ba8027c186705d752b8" UNIQUE ("code"), CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "display_name" character varying(255), "module_name" character varying(100), "description" text, "type" character varying(20) NOT NULL DEFAULT 'FEATURE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" integer, "updated_by_id" integer, CONSTRAINT "UQ_8dad765629e83229da6feda1c1d" UNIQUE ("code"), CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "display_name" character varying(255), "description" text, "is_read_only" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" integer, "updated_by_id" integer, CONSTRAINT "UQ_f6d54f95c31b73fb1bdd8e91d0c" UNIQUE ("code"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ebeca66c6362a547803adc9c9ce" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_permission" ("user_id" integer NOT NULL, "permission_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f8b869602bf4ffae2771972b667" PRIMARY KEY ("user_id", "permission_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_to_permission" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac8e72c29abc2d6c4cf590856c9" PRIMARY KEY ("role_id", "permission_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "destination_images" ADD CONSTRAINT "FK_1d23921a8483ecb6e3b21a57074" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour_schedules" ADD CONSTRAINT "FK_00c5a257e8a6c49881f5b0afea3" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_ad8f030e70663afeb8b9e3c325f" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_bbd6ac6e3e6a8f8c6e0e8692d63" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tours" ADD CONSTRAINT "FK_d0ca2ba62165fba61ce11c8e5c4" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tours" ADD CONSTRAINT "FK_288b14a10188988ddf0e289e3ab" FOREIGN KEY ("tour_guide_id") REFERENCES "tour_guides"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour_guides" ADD CONSTRAINT "FK_a0720cb49fd754b25bf31c10d2a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_e86edf76dc2424f123b9023a2b2" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_58be2b6e3020acb14946ba493ad" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_7bc8366af1bd0c09850cef683bd" FOREIGN KEY ("cancelled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_841d786908fe85c96a15a4a4ba3" FOREIGN KEY ("confirmed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking_participants" ADD CONSTRAINT "FK_d0c6f1f0892061f1cc2d325c1c9" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "FK_112900b46aa94e7c5a2bf1db66d" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "FK_8d3bc8b8b1eb2772cd919470810" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_c3c2504053ba7833fe9f1985531" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_558233de32f30a3ee243854e188" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_42353a3d71b2924e2b384901d7f" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_role" ADD CONSTRAINT "FK_cf3d99d0316e0fb041a6a61738d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_role" ADD CONSTRAINT "FK_cbe516445858eb55127cbaa6801" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_permission" ADD CONSTRAINT "FK_1875d0429f92cf21b31c5e493f8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_permission" ADD CONSTRAINT "FK_c5e9a018194ef19419fffb5e3a0" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_to_permission" ADD CONSTRAINT "FK_ac652a18fe944c79c5a9e87c8ff" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_to_permission" ADD CONSTRAINT "FK_9dc2c10538df147048ce9672589" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_to_permission" DROP CONSTRAINT "FK_9dc2c10538df147048ce9672589"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_to_permission" DROP CONSTRAINT "FK_ac652a18fe944c79c5a9e87c8ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_permission" DROP CONSTRAINT "FK_c5e9a018194ef19419fffb5e3a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_permission" DROP CONSTRAINT "FK_1875d0429f92cf21b31c5e493f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_role" DROP CONSTRAINT "FK_cbe516445858eb55127cbaa6801"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_role" DROP CONSTRAINT "FK_cf3d99d0316e0fb041a6a61738d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_42353a3d71b2924e2b384901d7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_558233de32f30a3ee243854e188"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_c3c2504053ba7833fe9f1985531"`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" DROP CONSTRAINT "FK_8d3bc8b8b1eb2772cd919470810"`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" DROP CONSTRAINT "FK_112900b46aa94e7c5a2bf1db66d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking_participants" DROP CONSTRAINT "FK_d0c6f1f0892061f1cc2d325c1c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_841d786908fe85c96a15a4a4ba3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_7bc8366af1bd0c09850cef683bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_58be2b6e3020acb14946ba493ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_e86edf76dc2424f123b9023a2b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour_guides" DROP CONSTRAINT "FK_a0720cb49fd754b25bf31c10d2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tours" DROP CONSTRAINT "FK_288b14a10188988ddf0e289e3ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tours" DROP CONSTRAINT "FK_d0ca2ba62165fba61ce11c8e5c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_bbd6ac6e3e6a8f8c6e0e8692d63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_ad8f030e70663afeb8b9e3c325f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour_schedules" DROP CONSTRAINT "FK_00c5a257e8a6c49881f5b0afea3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "destination_images" DROP CONSTRAINT "FK_1d23921a8483ecb6e3b21a57074"`,
    );
    await queryRunner.query(`DROP TABLE "role_to_permission"`);
    await queryRunner.query(`DROP TABLE "user_to_permission"`);
    await queryRunner.query(`DROP TABLE "user_to_role"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "features"`);
    await queryRunner.query(`DROP TABLE "booking_participants"`);
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tour_guides"`);
    await queryRunner.query(`DROP TABLE "tours"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c5773ff995ca1184399289d84"`,
    );
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5fe6cc04e62bd2a456fbbac82d"`,
    );
    await queryRunner.query(`DROP TABLE "tour_schedules"`);
    await queryRunner.query(`DROP TABLE "destinations"`);
    await queryRunner.query(`DROP TABLE "destination_images"`);
  }
}
