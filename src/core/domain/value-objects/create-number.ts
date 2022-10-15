import {
  ValidationProps,
  ValidatorsParams,
  ValueObject,
} from '@/core/domain/interfaces';
import {
  validateMaxValue,
  validateMinValue,
  validateRequired,
} from '@/core/domain/validators';
import { hasActiveErrors } from '@/core/domain/utils';

export const createNumber = (
  value: string | number,
  params?: Pick<ValidatorsParams, 'minValue' | 'maxValue'>,
  required = true,
): ValueObject<number> => {
  const parsedValue = +value;
  const errors: ValidationProps = { params: {} };
  const minValue = params?.minValue ?? 0;
  const maxValue = params?.maxValue ?? Number.MAX_SAFE_INTEGER;

  if (required) {
    errors.required = validateRequired(parsedValue);
  }

  errors.minValue = validateMinValue(parsedValue, minValue);
  errors.maxValue = validateMaxValue(parsedValue, maxValue);
  errors.params.minValue = minValue;
  errors.params.maxValue = maxValue;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value: parsedValue };
};
