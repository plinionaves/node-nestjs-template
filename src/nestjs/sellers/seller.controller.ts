import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateSellerInput,
  CreateSellerUseCase,
  GetSellerUseCase,
} from '@/seller/application/usecases';
import { handleError } from '@/nestjs/shared/utils';

@Controller('sellers')
export class SellerController {
  constructor(
    private createSellerUsecase: CreateSellerUseCase,
    private getSellerUsecase: GetSellerUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateSellerInput) {
    try {
      return await this.createSellerUsecase.run(body);
    } catch (error) {
      handleError(error);
    }
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    try {
      return await this.getSellerUsecase.run(uuid);
    } catch (error) {
      handleError(error);
    }
  }
}
