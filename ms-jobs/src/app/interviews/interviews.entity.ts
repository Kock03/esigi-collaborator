import {
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
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';
import { ICollaborator } from './_model/collaborator.model';

@Entity()
export class InterviewsEnitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
