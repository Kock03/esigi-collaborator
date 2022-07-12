import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Situation } from '../behavioral-interviews/enums/situational.enum';
import { JobsEntity } from '../jobs/jobs.entity';
import { Reason } from './enums/reason.enum';
import { TypeContract } from './enums/type-contract.enum';

@Entity()
export class ReturnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  dateOfReturn: Date;

  @Column()
  behavioralEvaluation: Situation;

  @Column()
  technicalEvaluation: Situation;

  @Column()
  behavioralEvaluationComent: string;

  @Column()
  technicalEvaluationComent: string;

  @Column()
  returnOfCandidate: boolean;

  @Column()
  reason: Reason;

  @Column()
  typeOdContract: TypeContract;

  @Column()
  combinedValue: string;

  @Column()
  initialData: Date;

  @ManyToOne(() => JobsEntity, job => job.Returns, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  Job: JobsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
