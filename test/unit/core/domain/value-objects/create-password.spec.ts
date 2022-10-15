import { Chance } from 'chance';

import { createPassword } from '@/core/domain/value-objects';

const chance = new Chance();

describe('createPassword', () => {
  it('should invalidate in the required rule', () => {
    const password = '';

    const passwordValueObject = createPassword(password);

    expect(passwordValueObject.value).toBe(password);
    expect(passwordValueObject.isValid).toBe(false);
    expect(passwordValueObject.errors).toMatchObject({
      required: false,
    });
  });

  it('should invalidate in the string rule', () => {
    const password = chance.integer();

    const passwordValueObject = createPassword(password as any);

    expect(passwordValueObject.value).toBe(password);
    expect(passwordValueObject.isValid).toBe(false);
    expect(passwordValueObject.errors).toMatchObject({
      required: true,
      string: false,
    });
  });

  it('should invalidate in the minLength rule', () => {
    const password = chance.string({ length: 7 });

    const passwordValueObject = createPassword(password);

    expect(passwordValueObject.value).toBe(password);
    expect(passwordValueObject.isValid).toBe(false);
    expect(passwordValueObject.errors).toMatchObject({
      required: true,
      string: true,
      minLength: false,
    });
  });

  it('should invalidate in the maxLength rule', () => {
    const password = chance.string({ length: 64 });

    const passwordValueObject = createPassword(password, { maxLength: 32 });

    expect(passwordValueObject.value).toBe(password);
    expect(passwordValueObject.isValid).toBe(false);
    expect(passwordValueObject.errors).toMatchObject({
      required: true,
      string: true,
      minLength: true,
      maxLength: false,
    });
  });

  it('should validate if all rules pass', () => {
    const password = chance.string({ length: 32 });

    const passwordValueObject = createPassword(password, { minLength: 20 });

    expect(passwordValueObject.value).toBe(password);
    expect(passwordValueObject.isValid).toBe(true);
    expect(passwordValueObject.errors).toMatchObject({
      required: true,
      string: true,
      minLength: true,
      maxLength: true,
    });
  });
});
