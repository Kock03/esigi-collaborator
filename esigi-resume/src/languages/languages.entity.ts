import { ResumesEntity } from 'src/resumes/resumes.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fluency } from './dto/fluency-level.enum';
import { Idiom } from './dto/idioms.enum';

@Entity({ name: 'languages' })
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'idiom', type: 'int' })
  idiom: Idiom;

  @Column({ name: 'fluency', type: 'int' })
  fluency: Fluency;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.languages, {
    eager: true,
  })
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
