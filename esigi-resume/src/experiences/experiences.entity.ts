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

@Entity({ name: 'experiences' })
export class ExperiencesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'position', length: 40 })
  position: string;

  @Column({ name: 'company_name', length: 70 })
  companyName: string;

  @Column({ name: 'location', length: 40 })
  location: string;

  @Column({ name: 'current_position', type: 'boolean' })
  currentPosition: boolean;

  @CreateDateColumn({ name: 'start_date', type: 'datetime' })
  startDate: Date;

  @CreateDateColumn({ name: 'end_date', type: 'datetime' })
  endDate: Date;

  @Column({ name: 'sector', length: 40 })
  sector: string;

  @Column({ name: 'description', length: 100 })
  description: string;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.experience, {
    eager: true,
  })
  resume: ResumesEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
