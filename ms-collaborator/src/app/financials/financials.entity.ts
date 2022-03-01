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
import { Reasons } from './dtos/contract-reasons.enum';
import { ContractTypes } from './dtos/contract-types.enum';

@Entity()
export class FinancialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'contract_type', type: 'int' })
  @Column({ type: 'int' })
  contractType: ContractTypes;

  @Column()
  value: number;

  @Column({ type: 'int' })
  reason: Reasons;

  @Column()
  dateInclusion: Date;

  @Column({ type: 'double', nullable: true })
  monthlyValue: number;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Financials,
    { onDelete: 'CASCADE' },
  )
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

  @BeforeInsert()
  monthlyValueCalculation() {
    this.monthlyValue = this.value * 170
  }

  @BeforeUpdate()
  monthlyValueCalculationAgain() {
    this.monthlyValue = this.value * 170
  }

}
