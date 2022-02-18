import { JobsEntity } from 'src/app/jobs/jobs.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Presentation } from './enums/presentation.enum';
import { Punctuality } from './enums/punctuality.enum';

@Entity({ name: 'behavioral_interviews' })
export class BehaviroalInterviewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  techRecruter: string;

  @Column()
  behavioralInterviewDate: Date;

  @Column()
  hourInterview: string;

  @Column()
  punctuality: Punctuality;

  @Column()
  presentation: Presentation;

  @Column()
  salaryExpectation: string;

  @Column()
  hiringPreference: string;

  @Column()
  behavioralAssessment: string;

  @Column()
  comments: string;

  @Column()
  situational: boolean;

  @Column()
  availabilityOfInitialize: string;

  @ManyToMany(() => JobsEntity, (jobs) => jobs.BehavioralInterviews, {
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
