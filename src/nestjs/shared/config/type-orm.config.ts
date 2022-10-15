import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { SellerPostgres } from '@/seller/infra/db';

config();

const configService = new ConfigService();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  schema: configService.get('POSTGRES_SCHEMA'),
  entities: [SellerPostgres],
  migrations: ['./dist/src/nestjs/shared/database/migrations/**/*.js'],
};

export default new DataSource(typeOrmConfig);
