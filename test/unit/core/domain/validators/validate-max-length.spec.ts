import { validateMaxLength } from '@/core/domain/validators';

describe('validateMaxLength', () => {
  it('should validate empty string', () => {
    expect(validateMaxLength('', 5)).toBe(true);
  });

  it('should validate empty string for arbitrary limits', () => {
    expect(validateMaxLength('', -1)).toBe(true);
  });

  it('should validate null', () => {
    expect(validateMaxLength(null, 5)).toBe(true);
  });

  it('should not validate too long string', () => {
    expect(validateMaxLength('abcdefgh', 5)).toBe(false);
  });

  it('should validate characters on length bound', () => {
    expect(validateMaxLength('abcde', 5)).toBe(true);
  });

  it('should not validate too much characters', () => {
    expect(validateMaxLength('abcdefghi', 5)).toBe(false);
  });

  it('should validate chain of spaces', () => {
    expect(validateMaxLength('     ', 5)).toBe(true);
  });

  it('should validate empty arrays', () => {
    expect(validateMaxLength([], -2)).toBe(true);
  });

  it('should validate short arrays', () => {
    expect(validateMaxLength([1], 5)).toBe(true);
  });

  it('should not validate too long arrays', () => {
    expect(validateMaxLength([1, 2, 3, 4, 5, 6], 5)).toBe(false);
  });

  it('should validate arrays on length bound', () => {
    expect(validateMaxLength([1, 2, 3, 4, 5], 5)).toBe(true);
  });

  it('should validate empty objects', () => {
    expect(validateMaxLength({}, -2)).toBe(true);
  });

  it('should validate short objects', () => {
    expect(validateMaxLength({ a: 1 }, 5)).toBe(true);
  });

  it('should not validate too long objects', () => {
    expect(validateMaxLength({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, 5)).toBe(
      false,
    );
  });

  it('should validate objects on length bound', () => {
    expect(validateMaxLength({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 5)).toBe(true);
  });
});
