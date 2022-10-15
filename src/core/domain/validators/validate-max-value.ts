import { validateRequired } from './validate-required';

export const validateMaxValue = (
  value: number | string | Date,
  maxValue: number | Date,
  checkRequired = true,
): boolean => {
  const maxValueIsValid =
    (!/\s/.test(value as string) || (value as any) instanceof Date) &&
    +value <= maxValue &&
    typeof value !== 'boolean';

  return checkRequired
    ? validateRequired(value) && maxValueIsValid
    : maxValueIsValid || [null, undefined, ''].includes(value as any);
};
