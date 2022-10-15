import { Module } from '@nestjs/common';

import { SellerModule } from './sellers/seller.module';
import { DatabaseModule } from './shared/database.module';

@Module({
  imports: [DatabaseModule, SellerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
