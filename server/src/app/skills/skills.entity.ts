import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'skills' })
export class SkillsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tecnology' })
  tecnology: string;

  @Column({name:'senioridade', type:'int'})
  senioridade: Senioridade;

  @Column({ name: 'years_experience' })
  yearsExperience: number;

  @Column({ name: 'current_position' })
  currentPosition: boolean;

  @ManyToOne(() => CollaboratorsEntity, collaborators => collaborators.skills)
  collaborator: CollaboratorsEntity[];


  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

}
