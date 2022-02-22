import { ResumesEntity } from 'src/resumes/resumes.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seniority } from './dto/seniority.enum';

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  technology: string;

  @Column({ name: 'period_experience', length: 15 })
  yearsExperience: string;

  @Column({ name: 'level', type: 'int' })
  seniority: Seniority;

  @Column()
  currentPosition: boolean;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.Skills, {
  })
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'date_inclusion' })
  dateInclusion: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
