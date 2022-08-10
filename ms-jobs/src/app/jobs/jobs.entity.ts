import {
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KnowledgesEntity } from '../knowledges/knowledges.entity';
import { Schooling } from './dtos/schooling.enum';
import { Status } from './dtos/status.enum';
import { Type } from './dtos/type.enum';
import { TypeOfContract } from './dtos/type-of-contract.enum';
import { Workplace } from './dtos/workplace.enum';
import { SenioritiesEntity } from '../seniorities/seniorities.entity';
import { LanguagesEntity } from '../languages/languages.entity';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from '../client-interviews/client-interviews.entity';
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';
import { ReturnsEntity } from '../returns/returns.entity';
import { InterviewsEnitiy } from '../interviews/interviews.entity';
import { ICollaborator } from './_model/collaborator.model';
import { ICustomer } from './_model/customer.model';

@Entity()
export class JobsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collaboratorRequesterId: string;

  @Column()
  status: Status;

  @Column()
  publish: boolean;

  @Column()
  customerId: string;

  @Column({ type: 'int' })
  typeOfJob: Type;

  @Column()
  temporary: boolean;

  @Column()
  monthTime: string;

  @Column()
  jobName: string;

  @Column()
  startForecast: string;

  @Column({ type: 'int' })
  jobNumber: number;

  @Column({ type: 'int' })
  typeOfContract: TypeOfContract;

  @Column({ type: 'int' })
  workplace: Workplace;

  @Column()
  workingDay: string;

  @Column()
  minimumValue: string;

  @Column()
  maximumValue: string;

  @Column({ type: 'int', nullable: true })
  schooling: Schooling;

  @Column({ length: '3000', nullable: true })
  collaboratorActivities: string;

  @Column({ length: '3000', nullable: true })
  skills: string;

  @Column({ length: '3000', nullable: true })
  acquirements: string;

  @Column({ length: '3000', nullable: true })
  attitudes: string;

  @Column()
  openingDate: string;

  @OneToMany(() => LanguagesEntity, (languages) => languages.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Languages: LanguagesEntity[];

  @OneToMany(() => KnowledgesEntity, (Knowledges) => Knowledges.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
    nullable: true
  })
  @JoinColumn()
  Knowledges: KnowledgesEntity[];

  @OneToOne(() => SenioritiesEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Seniorities: SenioritiesEntity;

  @OneToMany(() => InterviewsEnitiy, (interviews) => interviews.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinTable()
  Interviews: InterviewsEnitiy[];

  @OneToMany(() => ReturnsEntity, (returns) => returns.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
  })
  Returns: ReturnsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  collaborator: ICollaborator;

  customer: ICustomer;
}
