import { TaxIdType } from '@/core/domain/enums';
import { TaxId } from '@/core/domain/interfaces';
import { validateCNPJ } from './validate-cnpj';

export const validateTaxId = (taxId: TaxId): boolean => {
  if ([null, undefined, ''].includes(taxId.value as any)) {
    return false;
  }

  switch (taxId.type) {
    case TaxIdType.CNPJ:
      return validateCNPJ(taxId.value);

    default:
      return false;
  }
};
