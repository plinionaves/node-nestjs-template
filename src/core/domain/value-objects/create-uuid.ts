import { uuid } from '@/core/domain/adapters';

import { ValidationProps, ValueObject } from '@/core/domain/interfaces';
import { hasActiveErrors } from '@/core/domain/utils';

export const createUUID = (value: string): ValueObject<string> => {
  const errors: ValidationProps = { params: {} };

  errors.uuid = uuid.validate(value);
  errors.params.uuid = value;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value };
};
