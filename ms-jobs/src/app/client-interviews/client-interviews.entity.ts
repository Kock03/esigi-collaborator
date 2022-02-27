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
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Situation } from '../behavioral-interviews/enums/situational.enum';

@Entity({ name: 'client_interviews' })
export class ClientInterviewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  evaluator: string;

  @Column()
  clientInterviewDate: Date;

  @Column()
  hourInterview: string;

  @Column()
  punctuality: Punctuality;

  @Column()
  jobProfile: boolean;

  @Column()
  technicalEvaluation: string;

  @Column()
  comments: string;

  @Column()
  situational: Situation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
