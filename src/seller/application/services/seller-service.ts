import { SellerEntity } from '@/seller/domain/entities';
import { SellerRepository } from '@/seller/application/protocols';

export class SellerService {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async create(seller: SellerEntity) {
    await this.sellerRepository.create(seller);
  }
}
