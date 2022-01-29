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
} from 'typeorm';
import { ContractTypes } from './dtos/contract-types.enum';

@Entity({ name: 'financials' })
export class FinancialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'contract_type', type: 'int'})
  contractType: ContractTypes;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'reason', type: 'int' })
  reason: Reasons;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Financials,{ onDelete: "CASCADE" }
  ) // specify inverse side as a second parameter
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'date_inclusion' })
  dateInclusion: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
