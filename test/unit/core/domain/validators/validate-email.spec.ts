import { Chance } from 'chance';

import { validateEmail } from '@/core/domain/validators';

const chance = new Chance();

describe('validateEmail', () => {
  test('should return false if value is not a string', () => {
    expect(validateEmail(55 as any)).toBe(false);
  });

  test('should return false if length is greater than 256 chars', () => {
    const longString =
      'a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55a55@a55.tech';

    expect(validateEmail(longString)).toBe(false);
  });

  test('should return false if email is invalid', () => {
    const invalidEmails = [
      '',
      'user',
      'user@a55',
      'user@a55.t',
      'a55.tech',
      'a”b(c)d,e:f;gi[j\\k]l@domain.com',
      'a@b@c@gmail.com',
      'ab"cde"@gmail.com',
      'ab"\\c"@gmail.com',
      'abc\\ is”not\valid@domain.com',
      'user@hotmail..com',
      '.user@gmail.com',
      ' user@gmail.com',
      'user 01@gmail.com',
      'user@gmail.com ',
      'admin@mailserver1',
      '“()<>[]:,;@\\”!#$%&’-/=?^_`{}| ~.a”@domain.org',
      '” “@domain.org',
      'example@localhost',
      'test@com',
      'test@localserver',
      'test@[IPv6:2018:db8::1]',
    ];

    invalidEmails.forEach((invalidEmail) => {
      const isValid = validateEmail(invalidEmail);

      expect(isValid).toBe(false);
    });
  });

  test('should return true if email is valid', () => {
    const validEmails = [
      'test@domain.com',
      'lastname@domain.com',
      'test.email.with+symbol@domain.com',
      'id-with-dash@domain.com',
      'a@domain.com',
      '"abc.test email"@domain.com',
      '"xyz.test.@.test.com"@domain.com',
      '"abc.(),:;<>[]\\".EMAIL.\\"email@\\ \\"email\\".test"@strange.domain.com',
      'example-abc@abc-domain.com',
      "#!$%&'*+-/=?^_{}|~@domain.org",
      'example@s.solutions',
      chance.email(),
      chance.email({ domain: 'ap.io' }),
      chance.email({ length: 30 }),
    ];

    validEmails.forEach((validEmail) => {
      const isValid = validateEmail(validEmail);

      expect(isValid).toBe(true);
    });
  });
});
