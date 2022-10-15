import { hasActiveErrors } from '@/core/domain/utils';
import { validateRequired } from '@/core/domain/validators';
import { ValidationProps, ValueObject } from '@/core/domain/interfaces';

export const createEnum = <T = unknown>(
  value: T,
  allowedValues: T[],
): ValueObject<T> => {
  const errors: ValidationProps<T> = { params: {} };

  errors.required = validateRequired(value);
  errors.enum = allowedValues.includes(value);
  errors.params.enum = allowedValues;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value };
};
