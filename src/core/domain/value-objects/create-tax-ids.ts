import { ValidationProps, ValueObject } from '@/core/domain/interfaces';
import { TaxId } from '@/core/domain/interfaces';
import { hasActiveErrors } from '@/core/domain/utils';
import { validateMinLength } from '../validators';
import { createTaxId } from './create-tax-id';

export const createTaxIds = (
  taxIds: TaxId[],
  minLength = 1,
): ValueObject<TaxId[]> => {
  const errors: ValidationProps = { params: {} };

  errors.each = (taxIds ?? []).map(
    (TaxId) => createTaxId(TaxId, { skipFullCheck: true }).errors,
  );
  errors.minLength = validateMinLength(taxIds, minLength, false);
  errors.params.minLength = minLength;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value: taxIds };
};
