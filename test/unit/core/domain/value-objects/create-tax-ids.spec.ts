import { TaxId } from '@/core/domain/interfaces';
import { createTaxIds } from '@/core/domain/value-objects';
import { TaxIdType } from '@/core/domain/enums';

describe('createTaxIds', () => {
  test('should invalidate if the taxId is invalid', () => {
    const taxIds: TaxId[] = [
      {
        value: 54545 as any,
        type: TaxIdType.CNPJ,
      },
    ];

    const taxIdsValueObject = createTaxIds(taxIds);

    expect(taxIdsValueObject.value).toEqual(taxIds);
    expect(taxIdsValueObject.isValid).toBe(false);
    expect(taxIdsValueObject.errors).toMatchObject({
      each: [{ taxId: false, required: true }],
    });
  });

  test('should invalidate if taxIds list is falsy or empty', () => {
    const tests: any[] = [null, []];

    tests.forEach((taxIds) => {
      const taxIdsValueObject = createTaxIds(taxIds);

      expect(taxIdsValueObject.value).toEqual(taxIds);
      expect(taxIdsValueObject.isValid).toBe(false);
      expect(taxIdsValueObject.errors).toMatchObject({
        minLength: false,
        each: [],
        params: { minLength: 1 },
      });
    });
  });

  test('should validate if taxId is valid', () => {
    const taxIds: TaxId[] = [
      {
        value: '38.374.611/0001-72',
        type: TaxIdType.CNPJ,
      },
    ];

    const taxIdsValueObject = createTaxIds(taxIds);

    expect(taxIdsValueObject.value).toEqual(taxIds);
    expect(taxIdsValueObject.isValid).toBe(true);
    expect(taxIdsValueObject.errors).toMatchObject({
      each: [{ taxId: true, required: true }],
    });
  });
});
