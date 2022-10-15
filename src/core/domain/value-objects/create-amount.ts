import { hasActiveErrors } from '@/core/domain/utils';
import {
  ValidationProps,
  ValueObject,
  ValidatorsParams,
} from '@/core/domain/interfaces';
import {
  validateMaxValue,
  validateMinValue,
  validateNumber,
  validateRequired,
} from '@/core/domain/validators';

const defaultMaxValue = Number.MAX_SAFE_INTEGER;

export const createAmount = (
  value: string | number,
  params?: Pick<ValidatorsParams, 'minAmount' | 'maxAmount'>,
): ValueObject<number> => {
  const parsedValue = +value;
  const minAmount = params?.minAmount ?? 0;
  const maxAmount = params?.maxAmount ?? defaultMaxValue;
  const errors: ValidationProps = { params: {} };

  errors.required = validateRequired(parsedValue);
  errors.number = validateNumber(parsedValue);
  errors.minAmount = validateMinValue(parsedValue, minAmount);
  errors.maxAmount = validateMaxValue(parsedValue, maxAmount);
  errors.params.maxAmount = maxAmount;
  errors.params.minAmount = minAmount;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value: parsedValue };
};
