import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
  Repository,
} from 'typeorm';
import { TaxIdType } from '@/core/domain/enums';
import { SellerEntity } from '@/seller/domain/entities';
import { SellerRepository } from '@/seller/application/protocols';
import { NotFoundError } from '@/core/domain/errors/not-found-error';

@Entity({ name: 'sellers' })
export class SellerPostgres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ default: null })
  name: string;

  @Column({ name: 'tax_id' })
  taxId: string;

  @Column({
    name: 'tax_id_type',
    type: 'enum',
    enum: TaxIdType,
    comment: 'Tax ID type',
  })
  taxIdType: string;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: null })
  updatedAt: Date;
}

export class SellerPostgresRepository implements SellerRepository {
  private repository: Repository<SellerPostgres>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(SellerPostgres);
  }

  async create(sellerEntity: SellerEntity): Promise<void> {
    const seller = new SellerPostgres();
    seller.uuid = sellerEntity.uuid;
    seller.taxId = sellerEntity.taxId.value;
    seller.taxIdType = sellerEntity.taxId.type;
    seller.createdAt = sellerEntity.createdAt;
    seller.updatedAt = sellerEntity.updatedAt;

    await this.repository.save(seller);
  }

  async get(uuid: string): Promise<SellerEntity> {
    const sellerDb = await this.repository.findOne({ where: { uuid } });

    if (!sellerDb) {
      throw new NotFoundError('errors.not_found', { uuid });
    }

    const sellerEntity = new SellerEntity({
      taxId: {
        value: sellerDb.taxId,
        type: TaxIdType[sellerDb.taxIdType.toUpperCase()],
      },
      name: sellerDb.name,
      uuid: sellerDb.uuid,
      createdAt: sellerDb.createdAt,
      updatedAt: sellerDb.updatedAt,
    });

    return sellerEntity;
  }
}
