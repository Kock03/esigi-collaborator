import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Languages,
  )
  Collaborator: CollaboratorsEntity;
}
