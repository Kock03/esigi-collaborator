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

@Entity()
export class FinancialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  contractType: ContractTypes;

  @Column()
  value: number;

  @Column({ type: 'int' })
  reason: Reasons;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Financials,
    { onDelete: 'CASCADE' },
  ) // specify inverse side as a second parameter
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn()
  dateInclusion: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
