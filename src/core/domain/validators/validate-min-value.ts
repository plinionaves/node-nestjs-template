import { validateRequired } from './validate-required';

export const validateMinValue = (
  value: number | string | Date,
  minValue: number | Date,
  checkRequired = true,
): boolean => {
  const minValueIsValid =
    (!/\s/.test(value as string) || (value as any) instanceof Date) &&
    +value >= minValue &&
    typeof value !== 'boolean';

  return checkRequired
    ? validateRequired(value) && minValueIsValid
    : minValueIsValid || [null, undefined, ''].includes(value as any);
};
