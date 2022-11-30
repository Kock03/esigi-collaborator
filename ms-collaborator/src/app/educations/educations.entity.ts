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


@Entity({ name: 'educations' })
export class EducationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schooling: string;

  @Column()
  course: string;

  @Column()
  institution: string;

  @Column()
  situation: string;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Educations,
  )
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
