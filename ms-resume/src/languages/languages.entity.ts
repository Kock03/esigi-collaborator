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
import { Fluency } from './dto/fluency.enum';
@Entity({ name: 'languages' })
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  languageName: string;

  @Column({ type: 'int' })
  degreeOfInfluence: Fluency;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.Languages)
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
