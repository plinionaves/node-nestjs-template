import { TaxIdType } from '@/core/domain/enums';
import { SellerEntity } from '@/seller/domain/entities';

describe('SellerEntity', () => {
  test('should create new seller entity', () => {
    const seller = () => {
      new SellerEntity({
        taxId: { type: TaxIdType.CNPJ, value: '' },
        qualified: false,
        lastQualificationDate: new Date(),
      });
    };

    expect(seller).toThrow();
    // expect(seller).toBeInstanceOf(SellerEntity);
    // expect(seller.uuid).toEqual('');
  });
});
