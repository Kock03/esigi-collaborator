import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @Column({ name: 'account_number', type: 'int' })
  accountNumber: number;

  @Column({ name: 'digit', type: 'int' })
  digit: number;

  @Column({ name: 'bank_account_digit', type: 'int' })
  bankAccountDigit: number;


  @OneToOne(() => CollaboratorsEntity)
  @JoinColumn()
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
