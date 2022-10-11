import { TaxId } from '@/core/domain/interfaces';

interface SellerEntityProps {
  uuid?: string;
  taxId: TaxId;
  qualified: boolean;
  lastQualificationDate: Date;
}

export class SellerEntity {
  constructor(private readonly props: SellerEntityProps) {
    if (!this.props.uuid) {
      this.props.uuid = 'uuidv4';
    }

    this.validate();
  }

  private validate() {
    throw new Error('test error');
  }

  get uuid() {
    return this.props.uuid;
  }

  get taxId() {
    return this.props.taxId;
  }
}
