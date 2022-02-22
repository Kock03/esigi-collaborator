import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobsEntity } from '../jobs/jobs.entity';
import { TypeOfPeriod } from './dtos/typeOfPeriod.enum';

@Entity({ name: 'knowledges' })
export class KnowledgesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  yearsExperience: number;

  @Column({ type: 'int' })
  typeOfPeriod: TypeOfPeriod;

  @ManyToOne(() => JobsEntity, (job) => job.Knowledges, { onDelete: 'CASCADE' })
  Job: JobsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
