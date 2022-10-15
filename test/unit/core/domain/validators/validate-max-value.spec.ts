import { validateMaxValue } from '@/core/domain/validators';

describe('validateMaxValue', () => {
  describe('validating as required', () => {
    it('should validate max number', () => {
      expect(validateMaxValue(1, 5)).toBe(true);
    });

    it('should validate the valid number', () => {
      expect(validateMaxValue(1, 6)).toBe(true);
    });

    it('should validate the invalid number', () => {
      expect(validateMaxValue(5, 4)).toBe(false);
    });

    it('should validate the string value', () => {
      expect(validateMaxValue('not string here', 5)).toBe(false);
    });

    it('should validate the object value', () => {
      expect(validateMaxValue({ hello: 'world' } as any, 5)).toBe(false);
    });

    it('should validate the maximum date value', () => {
      expect(validateMaxValue(new Date(100), new Date(100))).toBe(true);
    });

    it('should validate the valid date value', () => {
      expect(validateMaxValue(new Date(100), new Date(1000000))).toBe(true);
    });

    it('should validate the invalid date value', () => {
      expect(validateMaxValue(new Date(1000000), new Date(100))).toBe(false);
    });

    it('should validate falsy values', () => {
      const values = [null, undefined, '', false];

      values.forEach((value) => {
        expect(validateMaxValue(value as any, 50)).toBe(false);
      });
    });
  });

  describe('validating as optional', () => {
    it('should validate the valid number', () => {
      expect(validateMaxValue(1, 6, false)).toBe(true);
    });

    it('should validate the invalid date value', () => {
      expect(validateMaxValue(new Date(1000000), new Date(100), false)).toBe(
        false,
      );
    });

    it('should validate falsy values', () => {
      const values = [null, undefined, ''];

      values.forEach((value) => {
        expect(validateMaxValue(value as any, 50, false)).toBe(true);
      });
    });
  });
});
