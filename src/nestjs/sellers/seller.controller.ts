import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateSellerInput,
  CreateSellerUseCase,
} from '@/seller/application/usecases';
import { handleError } from '@/nestjs/shared/utils';

@Controller('sellers')
export class SellerController {
  constructor(private createSellerUsecase: CreateSellerUseCase) {}

  @Post()
  async create(@Body() body: CreateSellerInput) {
    try {
      return await this.createSellerUsecase.run(body);
    } catch (error) {
      handleError(error);
    }
  }
}
