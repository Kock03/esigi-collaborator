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
import { InterviewsEnitiy } from '../interviews/interviews.entity';
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
  dateOfReturn: string;

  @Column()
  behavioralEvaluation: Situation;

  @Column()
  technicalEvaluation: Situation;

  @Column({ nullable: true })
  behavioralEvaluationComent: string;

  @Column({ nullable: true })
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

  @OneToOne(() => InterviewsEnitiy, (interviews) => interviews.Returns)
  interviews: InterviewsEnitiy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
