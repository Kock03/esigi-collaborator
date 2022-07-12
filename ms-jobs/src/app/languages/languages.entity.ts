import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
import { JobsEntity } from '../jobs/jobs.entity';

@Entity()
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'language_name' })
  languageName: string;

  @Column({ name: 'degree_of_influence', type: 'int' })
  degreeOfInfluence: degreeOfInfluence;

  @ManyToOne(() => JobsEntity, (job) => job.Languages, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  Job: JobsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
