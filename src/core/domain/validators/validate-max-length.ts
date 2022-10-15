import { getLength } from '@/core/domain/utils';
import { validateRequired } from './validate-required';

export const validateMaxLength = <T>(
  value: T,
  maxLength: number,
  checkRequired = true,
): boolean => {
  const maxLengthIsValid = getLength(value) <= maxLength;

  return checkRequired
    ? !validateRequired(value) || maxLengthIsValid
    : maxLengthIsValid;
};
