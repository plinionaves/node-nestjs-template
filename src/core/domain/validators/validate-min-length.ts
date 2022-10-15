import { getLength } from '@/core/domain/utils';
import { validateRequired } from './validate-required';

export const validateMinLength = <T>(
  value: T,
  minLength: number,
  checkRequired = true,
): boolean => {
  const minLengthIsValid = getLength(value) >= minLength;

  return checkRequired
    ? !validateRequired(value) || minLengthIsValid
    : minLengthIsValid;
};
