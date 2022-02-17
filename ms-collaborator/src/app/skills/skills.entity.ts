import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Seniority } from './dtos/seniority.enun';

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ name: 'technology' })
  technology: string;


  @Column({ type: 'int' })
  seniority: Seniority;

  @Column()
  yearsExperience: number;

  @Column()
  currentPosition: boolean;

  @ManyToOne(() => CollaboratorsEntity, (collaborators) => collaborators.Skills)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
