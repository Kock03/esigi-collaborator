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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToMany(() => JobsEntity, (jobs) => jobs.ClientInterviews, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  Jobs: JobsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
