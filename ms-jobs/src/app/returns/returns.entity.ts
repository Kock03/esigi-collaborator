import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobsEntity } from '../jobs/jobs.entity';
import { Reason } from './enums/reason.enum';
import { TypeContract } from './enums/type-contract.enum';

@Entity({ name: 'returns' })
export class ReturnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  returnDate: Date;

  @Column()
  bahvioralAssessment: boolean;

  @Column()
  technicalAssessment: boolean;

  @Column()
  bahvioralAssessmentDescription: string;

  @Column()
  technicalAssessmentDescription: string;

  @Column()
  candidateReturn: boolean;

  @Column()
  reason: Reason;

  @Column()
  typeContract: TypeContract;

  @Column()
  closedValue: string;

  @Column()
  startDate: Date;

  @OneToOne(() => JobsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  job: JobsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
