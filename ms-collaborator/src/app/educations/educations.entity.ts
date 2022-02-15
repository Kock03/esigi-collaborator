import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollaboratorsEntity } from '../collaborators/collaborators.entity';
import { Schooling } from './dtos/schooling.enum';

@Entity({ name: 'educations' })
export class EducationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schooling: Schooling;

  @Column()
  course: string;

  @Column()
  institution: string;

  @Column({ type: 'int' })
  situation: Situation;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Educations,
  )
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
