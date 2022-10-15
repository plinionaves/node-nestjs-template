import { validateMinLength } from '@/core/domain/validators';

describe('validateMinLength', () => {
  describe('validating required', () => {
    it('should validate empty string', () => {
      expect(validateMinLength('', 5)).toBe(true);
    });

    it('should validate null', () => {
      expect(validateMinLength(null, 5)).toBe(true);
    });

    it('should not validate too short string', () => {
      expect(validateMinLength('a', 5)).toBe(false);
    });

    it('should validate enough characters', () => {
      expect(validateMinLength('abcde', 5)).toBe(true);
    });

    it('should validate more than necessary characters', () => {
      expect(validateMinLength('abcdefghi', 5)).toBe(true);
    });

    it('should validate enough spaces', () => {
      expect(validateMinLength('     ', 5)).toBe(true);
    });

    it('should validate empty arrays', () => {
      expect(validateMinLength([], 5)).toBe(true);
    });

    it('should not validate too short arrays', () => {
      expect(validateMinLength([1], 5)).toBe(false);
    });

    it('should validate arrays with enough elements', () => {
      expect(validateMinLength([1, 2, 3, 4, 5], 5)).toBe(true);
    });

    it('should validate empty objects', () => {
      expect(validateMinLength({}, 5)).toBe(true);
    });

    it('should not validate too short objects', () => {
      expect(validateMinLength({ a: 1 }, 5)).toBe(false);
    });

    it('should validate objects with enough elements', () => {
      expect(validateMinLength({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 5)).toBe(true);
    });
  });

  describe('not validating required', () => {
    it('should validate empty string', () => {
      expect(validateMinLength('', 5, false)).toBe(false);
    });

    it('should validate null', () => {
      expect(validateMinLength(null, 5, false)).toBe(false);
    });

    it('should not validate too short string', () => {
      expect(validateMinLength('a', 5, false)).toBe(false);
    });

    it('should validate enough characters', () => {
      expect(validateMinLength('abcde', 5, false)).toBe(true);
    });

    it('should validate more than necessary characters', () => {
      expect(validateMinLength('abcdefghi', 5, false)).toBe(true);
    });

    it('should validate enough spaces', () => {
      expect(validateMinLength('     ', 5, false)).toBe(true);
    });

    it('should validate empty arrays', () => {
      expect(validateMinLength([], 5, false)).toBe(false);
    });

    it('should not validate too short arrays', () => {
      expect(validateMinLength([1], 5, false)).toBe(false);
    });

    it('should validate arrays with enough elements', () => {
      expect(validateMinLength([1, 2, 3, 4, 5], 5, false)).toBe(true);
    });

    it('should validate empty objects', () => {
      expect(validateMinLength({}, 5, false)).toBe(false);
    });

    it('should not validate too short objects', () => {
      expect(validateMinLength({ a: 1 }, 5, false)).toBe(false);
    });

    it('should validate objects with enough elements', () => {
      expect(
        validateMinLength({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 5, false),
      ).toBe(true);
    });
  });
});
