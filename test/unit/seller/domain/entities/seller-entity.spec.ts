import { TaxIdType } from '@/core/domain/enums';
import { ValidationError } from '@/core/domain/errors';
import { SellerEntity } from '@/seller/domain/entities';

describe('SellerEntity', () => {
  test('should throw validation error if tax id is invalid', () => {
    const seller = () => {
      new SellerEntity({
        taxId: { type: TaxIdType.CNPJ, value: '123' },
        name: 'Seller Test Name',
        createdAt: new Date(),
        updatedAt: null,
      });
    };
    let error: ValidationError<any>;

    try {
      seller();
    } catch (err) {
      error = err;
    }

    expect(seller).toThrow('errors.validation.seller_entity');
    expect(seller).toThrowError(ValidationError);
    expect(error.params).toMatchObject({
      uuid: { uuid: true },
      taxId: { taxId: false },
    });
  });

  test('should throw validation error if uuid is invalid', () => {
    const seller = () => {
      new SellerEntity({
        uuid: 'non-valid-uuid',
        taxId: { type: TaxIdType.CNPJ, value: '63.452.941/0001-86' },
        name: 'Seller Test Name',
        createdAt: new Date(),
        updatedAt: null,
      });
    };
    let error: ValidationError<any>;

    try {
      seller();
    } catch (err) {
      error = err;
    }

    expect(seller).toThrow('errors.validation.seller_entity');
    expect(seller).toThrowError(ValidationError);
    expect(error.params).toMatchObject({
      uuid: { uuid: false },
      taxId: { taxId: true },
    });
  });

  test('should create new seller entity', () => {
    const seller = new SellerEntity({
      taxId: { type: TaxIdType.CNPJ, value: '63452941000186' },
      name: 'Seller Test Name',
      createdAt: new Date(),
      updatedAt: null,
    });

    expect(seller).toBeInstanceOf(SellerEntity);
  });
});
