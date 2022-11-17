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
import { TypeOfPeriod } from './dtos/type-of-period.enum';

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ name: 'technology' })
  technology: string;


  @Column()
  seniority: string;


  @Column({ type: 'int' })
  typeOfPeriod: TypeOfPeriod;

  @Column()
  yearsExperience: number;

  @Column()
  currentPosition: boolean;

  @Column()
  inactive: boolean;

  @ManyToOne(() => CollaboratorsEntity, (collaborators) => collaborators.Skills)
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
