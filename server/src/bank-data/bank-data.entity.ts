import { CollaboratorsEntity } from 'src/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountTypes } from './dtos/account-types.enum';

@Entity({ name: 'bank_data' })
export class BankDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'bank' })
  bank: string;

  @Column({ name: 'agency' })
  agency: string;

  @Column({ name: 'account_typet' })
  accountType: AccountTypes;

  @Column({ name: 'account_number' })
  accountNumber: string;

  @Column({ name: 'digit' })
  digit: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  collaborator: CollaboratorsEntity;
}
