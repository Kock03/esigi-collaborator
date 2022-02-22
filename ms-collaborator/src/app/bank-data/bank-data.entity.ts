import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
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

  @OneToOne(() => CollaboratorsEntity)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
