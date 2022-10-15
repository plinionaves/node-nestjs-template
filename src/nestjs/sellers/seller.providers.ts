import { SellerRepository } from '@/seller/application/protocols';
import { CreateSellerUseCase } from '@/seller/application/usecases';
import { SellerPostgresRepository } from '@/seller/infra/db';
import { DataSource } from 'typeorm';

const REPOSITORIES = {
  SELLER_POSTGRES_REPOSITORY: {
    provide: SellerPostgresRepository,
    useFactory(dataSource: DataSource) {
      return new SellerPostgresRepository(dataSource);
    },
    inject: [DataSource],
  },
};

const USECASES = {
  CREATE_SELLER_USECASE: {
    provide: CreateSellerUseCase,
    useFactory(sellerRepository: SellerRepository) {
      return new CreateSellerUseCase(sellerRepository);
    },
    inject: [SellerPostgresRepository],
  },
};

export const SELLERS_PROVIDERS = { REPOSITORIES, USECASES };
