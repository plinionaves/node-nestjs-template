import { Chance } from 'chance';

import { validateString } from '@/core/domain/validators';

const chance = new Chance();

describe('validateString', () => {
  test('should return false for non string values', () => {
    expect(validateString(null)).toBe(false);
    expect(validateString(undefined)).toBe(false);
    expect(validateString({})).toBe(false);
    expect(validateString([])).toBe(false);
    expect(validateString(() => 0)).toBe(false);
    expect(validateString(0)).toBe(false);
    expect(validateString(NaN)).toBe(false);
  });

  test('should return true for string values', () => {
    expect(validateString(chance.string())).toBe(true);
  });
});
