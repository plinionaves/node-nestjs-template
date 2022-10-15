import { ValidationProps, ValueObject } from '@/core/domain/interfaces';
import { hasActiveErrors } from '@/core/domain/utils';
import { validateMinLength } from '@/core/domain/validators';
import { createEmail } from './create-email';

export const createEmails = (
  emails: string[],
  minLength = 1,
): ValueObject<string[]> => {
  const errors: ValidationProps = { params: {} };

  errors.each = (emails ?? []).map(
    (email) => createEmail(email, { skipFullCheck: true }).errors,
  );
  errors.minLength = validateMinLength(emails, minLength, false);
  errors.params.minLength = minLength;

  const isValid = !hasActiveErrors(errors);

  return { errors, isValid, value: emails };
};
