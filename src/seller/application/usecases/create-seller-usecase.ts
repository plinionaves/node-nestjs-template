import { TaxId, UseCaseAsync } from '@/core/domain/interfaces';
import { SellerEntity } from '@/seller/domain/entities';
import { Seller } from '@/seller/domain/interfaces';
import { SellerRepository } from '../protocols';

export interface CreateSellerInput {
  taxId: TaxId;
  name?: string;
}

export class CreateSellerUseCase
  implements UseCaseAsync<CreateSellerInput, Seller>
{
  constructor(private readonly sellerRepository: SellerRepository) {}

  async run(input: CreateSellerInput): Promise<Seller> {
    const seller = new SellerEntity({
      ...input,
      name: input.name ?? null,
      createdAt: null,
      updatedAt: null,
    });

    await this.sellerRepository.create(seller);

    return seller;
  }
}
