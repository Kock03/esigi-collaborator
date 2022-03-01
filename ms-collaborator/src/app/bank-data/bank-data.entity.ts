import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';
import { AccountTypes } from './dtos/account-types.enum';

@Entity({ name: 'bank_data' })
export class BankDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bank: string;

  @Column()
  agency: string;

  @Column()
  accountType: AccountTypes;

  @Column()
  accountNumber: string;

  @Column()
  digit: string;

  @Column()
  bankAccountDigit: string;

  @Column()
  status: boolean;

  @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.BankData)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

  @BeforeInsert()
  InsertStatus() {
    if (this.id == null) {
      this.status = true
    }
  }

}
