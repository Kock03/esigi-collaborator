import { ResumesEntity } from 'src/resumes/resumes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Schooling } from './dto/schooling.enum';
import { Situation } from './dto/situation.enum';

@Entity({ name: 'educations' })
export class EducationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'education_level', type: 'int' })
  schooling: Schooling;

  @Column({ name: 'situation', type: 'int' })
  situation: Situation;

  @Column({ name: 'institution', length: 70 })
  institution: string;

  @Column({ name: 'course', length: 50 })
  course: string;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.Educations, {
 
  })
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
