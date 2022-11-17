import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ContractTypes } from './dtos/contract-types.enum';

@Entity()
export class FinancialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'contract_type', type: 'int' })
  contractType: ContractTypes;

  @Column()
  value: number;

  @Column()
  reason: string;

  @Column()
  payday: string;

  @Column()
  dateInclusion: string;

  @Column({ type: 'double', nullable: true })
  monthlyValue: number;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Financials,
    { onDelete: 'CASCADE' },
  )
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
