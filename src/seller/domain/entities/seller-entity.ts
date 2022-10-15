import { uuid } from '@/core/domain/adapters';
import { ValidationError } from '@/core/domain/errors';
import { TaxId } from '@/core/domain/interfaces';
import { someValueObjectIsInvalid } from '@/core/domain/utils';
import { createTaxId, createUUID } from '@/core/domain/value-objects';

interface SellerEntityProps {
  uuid?: string;
  name?: string;
  taxId: TaxId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SellerEntity {
  uuid: string;
  taxId: TaxId;
  name: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(props: SellerEntityProps) {
    this.init(props);
    this.validate();
  }

  private init(props: SellerEntityProps) {
    this.uuid = props.uuid ?? uuid.create();
    this.taxId = props.taxId;
    this.name = props.name ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }

  private validate() {
    const uuid = createUUID(this.uuid);
    const taxId = createTaxId(this.taxId);

    if (someValueObjectIsInvalid([uuid, taxId])) {
      throw new ValidationError('errors.validation.seller_entity', {
        uuid: uuid.errors,
        taxId: taxId.errors,
      });
    }

    this.taxId.value = taxId.value.value;
  }
}
