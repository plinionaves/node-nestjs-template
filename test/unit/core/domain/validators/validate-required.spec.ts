import { Chance } from 'chance';

import { validateRequired } from '@/core/domain/validators';

const chance = new Chance();

describe('validateRequired', () => {
  test('should return false for invalid values', () => {
    expect(validateRequired([])).toBe(false);
    expect(validateRequired(undefined)).toBe(false);
    expect(validateRequired(new Date('not-valid'))).toBe(false);
    expect(validateRequired(null)).toBe(false);
    expect(validateRequired('')).toBe(false);
    expect(validateRequired(' ')).toBe(false);
    expect(validateRequired({})).toBe(false);
  });

  test('should return true for valid values', () => {
    expect(validateRequired(chance.string())).toBe(true);
    expect(validateRequired(chance.integer())).toBe(true);
    expect(validateRequired(` ${chance.string()} `)).toBe(true);
    expect(validateRequired([0, 1])).toBe(true);
    expect(validateRequired(new Date())).toBe(true);
    expect(validateRequired({ tech: 'a55' })).toBe(true);
  });
});
