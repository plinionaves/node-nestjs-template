import { uuid } from '@/core/domain/adapters';
import { createUUID } from '@/core/domain/value-objects';

describe('createUUID', () => {
  test('should not validate invalid uuid values', () => {
    const values: any[] = [null, undefined, 'abc', 123, new Date()];

    values.forEach((value) => {
      const uuidValueObject = createUUID(value);

      expect(uuidValueObject.value).toBe(value);
      expect(uuidValueObject.isValid).toBe(false);
      expect(uuidValueObject.errors).toMatchObject({ uuid: false });
    });
  });

  test('should validate valid uuid values', () => {
    const values: any[] = [uuid.create(), uuid.create(), uuid.create()];

    values.forEach((value) => {
      const uuidValueObject = createUUID(value);

      expect(uuidValueObject.value).toBe(value);
      expect(uuidValueObject.isValid).toBe(true);
      expect(uuidValueObject.errors).toMatchObject({ uuid: true });
    });
  });
});
