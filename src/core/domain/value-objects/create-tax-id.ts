import {
  ValidationProps,
  ValueObject,
  ValueObjectOptions,
} from '@/core/domain/interfaces';
import { TaxId } from '@/core/domain/interfaces';
import { validateTaxId, validateRequired } from '@/core/domain/validators';
import { hasActiveErrors } from '@/core/domain/utils';
import { TaxIdType } from '../enums';

export const createTaxId = (
  taxId: TaxId,
  options: ValueObjectOptions = {},
): ValueObject<TaxId> => {
  const { skipFullCheck = false } = options;
  const errors: ValidationProps = { params: {} };
  const cleanTaxId = { ...taxId };
  let isValid = false;

  if (cleanTaxId.type === TaxIdType.CNPJ) {
    cleanTaxId.value = cleanTaxId.value.toString().replace(/[\D]/gi, '');
  }

  errors.required = validateRequired(cleanTaxId);
  errors.taxId = validateTaxId(cleanTaxId);
  errors.params.taxId = cleanTaxId;

  if (!skipFullCheck) {
    isValid = !hasActiveErrors(errors);
  }

  return { errors, isValid, value: cleanTaxId };
};
