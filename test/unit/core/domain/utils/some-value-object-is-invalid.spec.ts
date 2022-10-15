import { ValueObject } from '@/core/domain/interfaces';
import { someValueObjectIsInvalid } from '@/core/domain/utils';

describe('someValueObjectIsInvalid', () => {
  test('should return true if all value objects are invalid', () => {
    const valueObjects: Array<ValueObject<unknown>> = [
      { errors: { params: {} }, isValid: false, value: undefined },
      { errors: { params: {} }, isValid: false, value: undefined },
    ];

    const haveAnyInvalid = someValueObjectIsInvalid(valueObjects);

    expect(haveAnyInvalid).toBe(true);
  });

  test('should return true if some value object is invalid', () => {
    const valueObjects: Array<ValueObject<unknown>> = [
      { errors: { params: {} }, isValid: true, value: undefined },
      { errors: { params: {} }, isValid: false, value: undefined },
    ];

    const haveAnyInvalid = someValueObjectIsInvalid(valueObjects);

    expect(haveAnyInvalid).toBe(true);
  });

  test('should return false if all value objects are valid', () => {
    const valueObjects: Array<ValueObject<unknown>> = [
      { errors: { params: {} }, isValid: true, value: undefined },
      { errors: { params: {} }, isValid: true, value: undefined },
    ];

    const haveAnyInvalid = someValueObjectIsInvalid(valueObjects);

    expect(haveAnyInvalid).toBe(false);
  });
});
