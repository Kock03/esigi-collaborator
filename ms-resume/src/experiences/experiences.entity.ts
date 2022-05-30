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

  @Column()
  office: string;

  @Column({ name: 'company_name', length: 70 })
  companyName: string;

  @Column()
  locality: string;

  @Column()
  active: boolean;

  @Column()
  startMonth: number;

  @Column()
  startYear : number;

  @Column({nullable: true})
  terminusMonth  : number;

  @Column({nullable: true})
  terminusYear : number;

  @Column({ name: 'sector', length: 40 })
  sector: string;

  @Column()
  description: string;

  @ManyToOne(() => ResumesEntity, (resumes) => resumes.Experiences, {

  })
  Resume: ResumesEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
