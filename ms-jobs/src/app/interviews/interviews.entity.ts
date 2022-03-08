import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BehavioralInterviewsEntity } from '../behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from '../client-interviews/client-interviews.entity';
import { JobsEntity } from '../jobs/jobs.entity';
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';

@Entity({ name: 'interviews' })
export class InterviewsEnitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => BehavioralInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  behavioralInterviews: BehavioralInterviewsEntity;

  @OneToOne(() => TechnicalInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  technicalInterviews: TechnicalInterviewsEntity;

  @OneToOne(() => ClientInterviewsEntity, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinColumn()
  clientInterviews: ClientInterviewsEntity;

  @ManyToOne(() => JobsEntity, (jobs) => jobs.interviews, {
    cascade: ['insert', 'update', 'soft-remove']
  })
  jobs: JobsEntity;
}
