import { JobsEntity } from 'src/app/jobs/jobs.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HiringPreferencesEntity } from '../hiringPreferences/hiringPreferences.entity';
import { Presentation } from './enums/presentation.enum';
import { Punctuality } from './enums/punctuality.enum';
import { Situation } from './enums/situational.enum';

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
  behavioralAssessment: string;

  @Column()
  comments: string;

  @Column()
  situational: Situation;

  @Column()
  availabilityOfInitialize: string;

  @OneToOne(() => HiringPreferencesEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  hiringPreferences: HiringPreferencesEntity;

  @ManyToOne(() => JobsEntity, job => job.TechnicalInterviews, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  Job: JobsEntity;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
