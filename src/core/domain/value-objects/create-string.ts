import {
  ValidationProps,
  ValidatorsParams,
  ValueObject,
} from '@/core/domain/interfaces';
import {
  validateMaxLength,
  validateMinLength,
  validateRequired,
  validateString,
} from '@/core/domain/validators';
import { hasActiveErrors } from '@/core/domain/utils';

export const createString = <T>(
  value: T,
  params?: Pick<ValidatorsParams, 'minLength' | 'maxLength'>,
  required = true,
): ValueObject<T> => {
  const errors: ValidationProps = { params: {} };
  const minLength = params?.minLength ?? 0;
  const maxLength = params?.maxLength ?? Number.MAX_SAFE_INTEGER;

  if (required) {
    errors.required = validateRequired(value);
    errors.string = validateString(value);
  }

  errors.minLength = validateMinLength(value, minLength);
  errors.maxLength = validateMaxLength(value, maxLength);
  errors.params.minLength = minLength;
  errors.params.maxLength = maxLength;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value };
};
