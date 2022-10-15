import {
  ValidationProps,
  ValueObject,
  ValueObjectOptions,
} from '@/core/domain/interfaces';
import { validateEmail, validateRequired } from '@/core/domain/validators';
import { hasActiveErrors } from '@/core/domain/utils';

export const createEmail = (
  value: string,
  options: ValueObjectOptions = {},
): ValueObject<string> => {
  const { skipFullCheck = false } = options;
  const errors: ValidationProps = { params: {} };
  let isValid = false;

  errors.required = validateRequired(value);
  errors.email = validateEmail(value);

  if (!skipFullCheck) {
    isValid = !hasActiveErrors(errors);
  }

  return { errors, isValid, value };
};
