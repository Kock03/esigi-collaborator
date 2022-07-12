import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobsEntity } from '../jobs/jobs.entity';

@Entity()
export class SenioritiesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  intern: boolean;

  @Column()
  junior: boolean;

  @Column()
  pleno: boolean;

  @Column()
  senior: boolean;

  @OneToOne(() => JobsEntity, (job) => job.Seniorities)
  Job: JobsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
