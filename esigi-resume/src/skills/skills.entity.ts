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
import { Level } from './dto/level.enum';
import { TechnologyType } from './dto/technology -type. enum';

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'technology', type: 'int' })
  technology: TechnologyType;

  @Column({ name: 'period_experience', length: 15 })
  periodExperience: string;

  @Column({ name: 'level', type: 'int' })
  level: Level;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.skills, {
    eager: true,
  })
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'date_inclusion' })
  dateInclusion: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
