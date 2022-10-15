import { SellerPostgres } from '@/seller/infra/db/seller-postgres';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerController } from './seller.controller';
import { SELLERS_PROVIDERS } from './seller.providers';

@Module({
  imports: [TypeOrmModule.forFeature([SellerPostgres])],
  controllers: [SellerController],
  providers: [
    ...Object.values(SELLERS_PROVIDERS.REPOSITORIES),
    ...Object.values(SELLERS_PROVIDERS.USECASES),
  ],
})
export class SellerModule {}
