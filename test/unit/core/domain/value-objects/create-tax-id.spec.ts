import { TaxId } from '@/core/domain/interfaces';
import { createTaxId } from '@/core/domain/value-objects';
import { TaxIdType } from '@/core/domain/enums';

describe('createTaxId', () => {
  test(`should clean the value if type is ${TaxIdType.CNPJ}`, () => {
    const taxIds: TaxId[] = [
      { value: '23.090.449/0001-93', type: TaxIdType.CNPJ },
      { value: 42930437000174 as any, type: TaxIdType.CNPJ },
      { value: 'HEGJ820506M10' as any, type: TaxIdType.RFC },
    ];

    taxIds.forEach((taxId) => {
      const taxIdValueObject = createTaxId(taxId);
      const cleanValue =
        taxId.type === TaxIdType.CNPJ
          ? taxId.value.toString().replace(/\D/gi, '')
          : taxId.value;

      expect(taxIdValueObject.value.value).toBe(cleanValue);
    });
  });
});
