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
  JoinColumn,
} from 'typeorm';


@Entity({ name: 'bank_data' })
export class BankDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bank: string;

  @Column()
  agency: string;

  @Column()
  accountType: string;

  @Column()
  accountNumber: string;

  @Column({ nullable: true })
  digit: string;

  @Column()
  bankAccountDigit: string;

  @Column()
  inactive: boolean;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.BankData,
  )
  @JoinColumn()
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
