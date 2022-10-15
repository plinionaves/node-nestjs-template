import { TaxId } from '@/core/domain/interfaces';

export interface Seller {
  uuid: string;
  name: string | null;
  taxId: TaxId;
  createdAt: Date;
  updatedAt: Date;
}
