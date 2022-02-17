import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'technical_interviews' })
export class TechnicalInterviewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  evaluator: string;

  @Column()
  technicalInterviewDate: Date;

  @Column()
  hourInterview: Date;

  @Column()
  punctuality: Punctuality;

  @Column()
  jobProfile: string;

  @Column()
  technicalEvaluation: string;

  @Column()
  comments: string;

  @Column()
  situational: boolean;

  @ManyToMany(() => JobsEntity, (jobs) => jobs.TechnicalInterviews, {
    cascade: ['insert'],
  })
  jobs: JobsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
