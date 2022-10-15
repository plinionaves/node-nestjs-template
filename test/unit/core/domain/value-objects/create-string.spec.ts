import { Chance } from 'chance';

import { createString } from '@/core/domain/value-objects';

const chance = new Chance();

describe('createString', () => {
  test('should not validate null and undefined values', () => {
    const values: any[] = [null, undefined];

    values.forEach((value) => {
      const stringValueObject = createString(value);

      expect(stringValueObject.value).toBe(value);
      expect(stringValueObject.isValid).toBe(false);
      expect(stringValueObject.errors).toMatchObject({
        required: false,
        string: false,
        minLength: true,
        maxLength: true,
      });
    });
  });

  test('should bypass needed rules if value is not required', () => {
    const value: any = null;

    const stringValueObject = createString(
      value,
      { minLength: 3, maxLength: 10 },
      false,
    );

    expect(stringValueObject.value).toBe(value);
    expect(stringValueObject.isValid).toBe(true);
    expect(stringValueObject.errors).toMatchObject({
      minLength: true,
      maxLength: true,
    });
    expect(stringValueObject.errors).not.toHaveProperty('required');
    expect(stringValueObject.errors).not.toHaveProperty('string');
  });

  test('should not validate if minLength is not met', () => {
    const value = chance.string({ length: 5 });

    const stringValueObject = createString(value, { minLength: 7 });

    expect(stringValueObject.value).toBe(value);
    expect(stringValueObject.isValid).toBe(false);
    expect(stringValueObject.errors).toMatchObject({
      required: true,
      string: true,
      minLength: false,
      maxLength: true,
    });
  });

  test('should not validate if maxLength is not met', () => {
    const value = chance.string({ length: 15 });

    const stringValueObject = createString(value, { maxLength: 10 });

    expect(stringValueObject.value).toBe(value);
    expect(stringValueObject.isValid).toBe(false);
    expect(stringValueObject.errors).toMatchObject({
      required: true,
      string: true,
      minLength: true,
      maxLength: false,
    });
  });
});
