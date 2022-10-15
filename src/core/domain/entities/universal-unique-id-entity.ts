import { ValidationError } from '@/core/domain/errors';
import { createUUID } from '@/core/domain/value-objects';

export class UniversalUniqueIdEntity {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
    this.validate();
  }

  private validate() {
    const uuid = createUUID(this.uuid);

    if (!uuid.isValid) {
      throw new ValidationError('errors.validation.uuid_entity', {
        uuid: uuid.errors,
      });
    }
  }
}
