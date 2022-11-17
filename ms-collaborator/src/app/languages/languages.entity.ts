import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CollaboratorsEntity } from '../collaborators/collaborators.entity';

@Entity({ name: 'languages' })
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  languageName: string;

  @Column()
  degreeOfInfluence: string;

  @CreateDateColumn()
  dateInclusion: Date;

  @ManyToOne(
    () => CollaboratorsEntity,
    (collaborator) => collaborator.Languages,
  )
  Collaborator: CollaboratorsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
