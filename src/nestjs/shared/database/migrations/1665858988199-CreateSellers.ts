import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSellers1665858988199 implements MigrationInterface {
  name = 'CreateSellers1665858988199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "seller_domain"."sellers_tax_id_type_enum" AS ENUM('cnpj', 'rfc')`,
    );
    await queryRunner.query(
      `CREATE TABLE "seller_domain"."sellers" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "name" character varying, "tax_id" character varying NOT NULL, "tax_id_type" "seller_domain"."sellers_tax_id_type_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id")); COMMENT ON COLUMN "seller_domain"."sellers"."tax_id_type" IS 'Tax ID type'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seller_domain"."sellers"`);
    await queryRunner.query(
      `DROP TYPE "seller_domain"."sellers_tax_id_type_enum"`,
    );
  }
}
