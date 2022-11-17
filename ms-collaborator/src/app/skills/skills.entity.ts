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

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tecnology' })
  tecnology: string;

  @Column()
  seniority: string;

  @Column({ name: 'years_experience' })
  yearsExperience: number;

  @Column({ name: 'current_position' })
  currentPosition: boolean;

  @ManyToOne(() => CollaboratorsEntity, collaborators => collaborators.Skills)
  Collaborator: CollaboratorsEntity;


  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
