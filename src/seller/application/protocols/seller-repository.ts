import { SellerEntity } from '@/seller/domain/entities';

export interface SellerRepository {
  create(seller: SellerEntity): Promise<void>;
  get(uuid: string): Promise<SellerEntity>;
}
