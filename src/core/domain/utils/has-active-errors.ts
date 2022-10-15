import { ValidationModel, ValidationProps } from '@/core/domain/interfaces';

type ErrorKey = keyof ValidationProps;

export const amountKeys: ErrorKey[] = ['minAmount', 'maxAmount'];
export const percentKeys: ErrorKey[] = ['minPercent', 'maxPercent'];

export const allErrorKeys: ErrorKey[] = [
  ...amountKeys,
  ...percentKeys,
  'taxId',
  'each',
  'email',
  'enum',
  'maxLength',
  'minLength',
  'maxValue',
  'minValue',
  'number',
  'password',
  'required',
  'status',
  'string',
  'uuid',
];

const isObject = <T = unknown>(params: T): boolean =>
  params !== null && params !== undefined && typeof params === 'object';

export const hasActiveErrors = (errors: ValidationModel): boolean => {
  const errorsKeys = Object.keys(errors).filter(
    (errorKey) => errorKey !== 'params',
  ) as any;

  return errorsKeys.some((errorKey: keyof ValidationModel) => {
    if (!allErrorKeys.includes(errorKey)) {
      return hasActiveErrors(errors[errorKey] as ValidationModel);
    }

    if (errorKey !== 'each') {
      if (!isObject(errors.params)) {
        return hasActiveErrors(errors[errorKey] as ValidationModel);
      }

      return [null, undefined, false].includes(
        errors[errorKey] as boolean | null | undefined,
      );
    }

    const errorsList = Array.isArray(errors.each)
      ? errors.each
      : Object.values(errors.each ?? {});

    return errorsList.some((nestedValue: any) => {
      if (isObject(nestedValue.params)) {
        return hasActiveErrors(nestedValue);
      }

      const nestedValueKeys = Object.keys(nestedValue);

      return nestedValueKeys.some((nestedErrorKey) =>
        hasActiveErrors(nestedValue[nestedErrorKey]),
      );
    });
  });
};
