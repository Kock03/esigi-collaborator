import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollaboratorsEntity } from '../collaborators/collaborators.entity';
import { FeedbackTypes } from './enums/feedback-types.enum';
import { Status } from './enums/status.enum';
import { ICollaborator } from './_model/collaborator.model';
import { IProject } from './_model/project.model';

@Entity({ name: 'feedbacks' })
export class FeedbacksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  feedbackType: FeedbackTypes;

  @Column()
  reason: string;

  @Column()
  projectId: string;

  @Column({ type: 'int' })
  status: Status;

  @Column()
  feedbackDate: string;

  @Column()
  hourDate: string;

  @Column({ nullable: true })
  feedbackDateRetorn: string;

  @Column({ nullable: true })
  hourDateRetorn: string;

  @Column()
  collaboratorManagerId: string;

  @Column({ nullable: true })
  managerDescription: string;

  @Column({ nullable: true })
  improvementPoints: string;

  @Column({ nullable: true })
  collaboratorDescription: string;

  @Column({ nullable: true })
  commitment: string;

  project: IProject;

  collaborator: ICollaborator;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => CollaboratorsEntity, (collaborators) => collaborators.Feedbacks)
  Collaborator: CollaboratorsEntity;
}
