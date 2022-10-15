import { Chance } from 'chance';

import { TaxId } from '@/core/domain/interfaces';
import { validateTaxId } from '@/core/domain/validators';
import { TaxIdType } from '@/core/domain/enums';

const chance = new Chance();

describe('validateTaxId', () => {
  test('should return false for invalid tax ids', () => {
    const invalidTaxIds: TaxId[] = [
      { value: chance.string({ length: 14 }), type: TaxIdType.CNPJ },
      { value: '01.234.567/0001-89', type: TaxIdType.CNPJ },
      { value: 12345 as any, type: TaxIdType.CNPJ },
      { value: 'invalid-cnpj', type: TaxIdType.CNPJ },
    ];

    invalidTaxIds.forEach((taxId) => {
      expect(validateTaxId(taxId)).toBe(false);
    });
  });

  test('should return true for valid tax ids', () => {
    const validTaxIds: TaxId[] = [
      { value: '23.090.449/0001-93', type: TaxIdType.CNPJ },
      { value: '31.084.370/0001-88', type: TaxIdType.CNPJ },
      { value: '46390189000177', type: TaxIdType.CNPJ },
      { value: 42930437000174 as any, type: TaxIdType.CNPJ },
    ];

    validTaxIds.forEach((taxId) => {
      expect(validateTaxId(taxId)).toBe(true);
    });
  });
});
