import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BehavioralInterviewsEntity } from '../behavioral-interviews/behavioral-interviews.entity';

@Entity({ name: 'hiring_preferences' })
export class HiringPreferencesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  intern: boolean;

  @Column()
  naturalPerson: boolean;

  @Column()
  legalPerson: boolean;

  @Column()
  cooperative: boolean;

  @OneToOne(
    () => BehavioralInterviewsEntity,
    (behaviroalInterviews) => behaviroalInterviews.hiringPreference,
  )
  BehaviroalInterview: BehavioralInterviewsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
