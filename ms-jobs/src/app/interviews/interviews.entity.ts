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
import { BehavioralInterviewsEntity } from '../behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from '../client-interviews/client-interviews.entity';
import { JobsEntity } from '../jobs/jobs.entity';
import { ReturnsEntity } from '../returns/returns.entity';
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';
import { ICollaborator } from './_model/collaborator.model';
import { IResume } from './_model/resume.model';

@Entity()
export class InterviewsEnitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @OneToOne(() => BehavioralInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  BehavioralInterviews: BehavioralInterviewsEntity;

  @OneToOne(() => TechnicalInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  TechnicalInterviews: TechnicalInterviewsEntity;

  @OneToOne(() => ClientInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  ClientInterviews: ClientInterviewsEntity;

  @OneToOne(() => ReturnsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  Returns: ReturnsEntity;

  @ManyToOne(() => JobsEntity, (jobs) => jobs.Interviews, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  Job: JobsEntity;



  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  collaborator: ICollaborator;

  resume: IResume;
}
