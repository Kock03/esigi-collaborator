
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeedbackTypes } from './enums/feedback-types.enum';
import { Reason } from './enums/reason.enum';
import { Status } from './enums/status.enum';

@Entity({ name: 'feedbacks' })
export class FeedbacksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  feedbackType: FeedbackTypes;

  @Column({ type: 'int' })
  reason: Reason;

  @Column()
  project: string;

  @Column()
  collaborator: string;

  @Column({ type: 'int' })
  status: Status;

  @Column()
  feedbackDate: Date;

  @Column()
  hourDate: string;

  @Column()
  feedbackDateRetorn: Date;

  @Column()
  hourDateRetorn: string;

  @Column()
  manager: string;

  @Column()
  managerDescription: string;

  @Column()
  improvementPoints: string;

  @Column()
  collaboratorDescription: string;

  @Column()
  commitment: string;



}
