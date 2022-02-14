import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CollaboratorsEntity } from '../collaborators/collaborators.entity';

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
