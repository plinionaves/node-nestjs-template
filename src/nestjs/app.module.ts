import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './sellers/seller.module';
import { DatabaseModule } from './shared/database.module';

@Module({
  imports: [DatabaseModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
