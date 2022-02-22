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
import { degreeOfInfluence } from './dtos/degree-of-influence.enum';

@Entity({ name: 'languages' })
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  languageName: string;

  @Column({ type: 'int' })
  degreeOfInfluence: degreeOfInfluence;

  @CreateDateColumn()
  dateInclusion: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Languages,
  )
  Collaborator: CollaboratorsEntity;
}
