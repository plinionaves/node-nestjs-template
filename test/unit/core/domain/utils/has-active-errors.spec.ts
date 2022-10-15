import { hasActiveErrors } from '@/core/domain/utils';

const mockNestedModel = (withArray = false): any => {
  const base = {
    minLength: true,
    required: true,
    params: {},
    user: {
      required: true,
      params: {},
      firstName: {
        minLength: false,
        params: { minLength: 3 },
      },
    },
  };

  return !withArray
    ? base
    : {
        ...base,
        permissions: {
          each: [
            { required: true, enum: false, params: {} },
            { required: true, enum: false, params: {} },
          ],
        },
      };
};

describe('hasActiveErrors', () => {
  test('should return true if all fields are invalid', () => {
    const validations = { email: false, required: false, params: {} };

    const hasErrors = hasActiveErrors(validations);

    expect(hasErrors).toBe(true);
  });

  test("should return true if some validation don't pass", () => {
    const validations = { email: true, required: false, params: {} };

    const hasErrors = hasActiveErrors(validations);

    expect(hasErrors).toBe(true);
  });

  test('should return false if all validations pass', () => {
    const validations = { email: true, required: true, params: {} };

    const hasErrors = hasActiveErrors(validations);

    expect(hasErrors).toBe(false);
  });

  test('should invalidate with non boolean prop values', () => {
    const validations = { minLength: undefined, required: null, params: {} };

    const hasErrors = hasActiveErrors(validations as any);

    expect(hasErrors).toBe(true);
  });

  test('should works with nested model', () => {
    const validations = mockNestedModel();

    let hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(true);

    validations.user.firstName.minLength = true;
    hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(false);
  });

  test('should works with array of objets', () => {
    const validations = mockNestedModel(true);

    let hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(true);

    validations.user.firstName.minLength = true;
    validations.permissions.each[0].enum = true;
    hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(true);

    validations.permissions.each[1].enum = true;
    hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(false);
  });

  test(`should works with map of errors in the 'each' prop`, () => {
    const validations = {
      minLength: true,
      each: {
        1400: {
          required: true,
          maxValue: true,
          params: {},
        },
        1478: {
          required: true,
          maxValue: false,
          params: {},
        },
      },
    };

    let hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(true);

    validations.each[1478].maxValue = true;
    hasErrors = hasActiveErrors(validations);
    expect(hasErrors).toBe(false);
  });
});
