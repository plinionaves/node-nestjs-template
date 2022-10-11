import { TaxIdType } from '@/core/domain/enums';

export interface TaxId {
  value: string;
  type: TaxIdType;
}
