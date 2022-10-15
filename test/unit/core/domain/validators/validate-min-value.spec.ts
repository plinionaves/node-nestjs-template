import { validateMinValue } from '@/core/domain/validators';

describe('validateMinValue', () => {
  describe('validating as required', () => {
    it('should validate min number', () => {
      expect(validateMinValue(5, 1)).toBe(true);
    });

    it('should validate the valid number', () => {
      expect(validateMinValue(6, 1)).toBe(true);
    });

    it('should validate the invalid number', () => {
      expect(validateMinValue(4, 5)).toBe(false);
    });

    it('should validate the string value', () => {
      expect(validateMinValue('not string here', 1)).toBe(false);
    });

    it('should validate the object value', () => {
      expect(validateMinValue({ hello: 'world' } as any, 1)).toBe(false);
    });

    it('should validate the minimum date value', () => {
      expect(validateMinValue(new Date(100), new Date(100))).toBe(true);
    });

    it('should validate the valid date value', () => {
      expect(validateMinValue(new Date(1000000), new Date(100))).toBe(true);
    });

    it('should validate the invalid date value', () => {
      expect(validateMinValue(new Date(100), new Date(1000000))).toBe(false);
    });

    it('should validate falsy values', () => {
      const values = [null, undefined, '', false];

      values.forEach((value) => {
        expect(validateMinValue(value as any, 0)).toBe(false);
      });
    });
  });

  describe('validating as optional', () => {
    it('should validate the valid number', () => {
      expect(validateMinValue(6, 3, false)).toBe(true);
    });

    it('should validate the invalid date value', () => {
      expect(validateMinValue(new Date(100), new Date(1000000), false)).toBe(
        false,
      );
    });

    it('should validate falsy values', () => {
      const values = [null, undefined, ''];

      values.forEach((value) => {
        expect(validateMinValue(value as any, 50, false)).toBe(true);
      });
    });
  });
});
