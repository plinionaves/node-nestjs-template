import { UniversalUniqueIdEntity } from '@/core/domain/entities';
import { UseCaseAsync } from '@/core/domain/interfaces';
import { Seller } from '@/seller/domain/interfaces';
import { SellerRepository } from '../protocols';

export type GetSellerInput = string;

export class GetSellerUseCase implements UseCaseAsync<GetSellerInput, Seller> {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async run(input: GetSellerInput): Promise<Seller> {
    const uuidEntity = new UniversalUniqueIdEntity(input);
    return await this.sellerRepository.get(uuidEntity.uuid);
  }
}
