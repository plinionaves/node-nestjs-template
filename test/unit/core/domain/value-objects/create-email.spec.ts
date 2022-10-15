import { Chance } from 'chance';
import { createEmail } from '@/core/domain/value-objects';

const chance = new Chance();

describe('createEmail', () => {
  it('should invalidate in the required and email rules', () => {
    const email = '';

    const emailValueObject = createEmail(email);

    expect(emailValueObject.value).toBe(email);
    expect(emailValueObject.isValid).toBe(false);
    expect(emailValueObject.errors).toMatchObject({
      required: false,
      email: false,
    });
  });

  it('should invalidate in the email rule', () => {
    const email = 'invalid-email';

    const emailValueObject = createEmail(email);

    expect(emailValueObject.value).toBe(email);
    expect(emailValueObject.isValid).toBe(false);
    expect(emailValueObject.errors).toMatchObject({
      required: true,
      email: false,
    });
  });

  it('should create email correctly', () => {
    const email = chance.email();

    const emailValueObject = createEmail(email);

    expect(emailValueObject.value).toBe(email);
    expect(emailValueObject.isValid).toBe(true);
    expect(emailValueObject.errors).toMatchObject({
      required: true,
      email: true,
    });
  });
});
