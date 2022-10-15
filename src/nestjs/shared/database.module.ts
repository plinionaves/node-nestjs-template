import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { typeOrmConfig } from './config/type-orm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        ...typeOrmConfig,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
