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
import { TypeOfContract } from './dtos/typeOfContract.enum';
import { Workplace } from './dtos/workplace.enum';
import { SenioritiesEntity } from '../seniorities/seniorities.entity';
import { LanguagesEntity } from '../languages/languages.entity';
import { BehaviroalInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from '../client-interviews/client-interviews.entity';
import { TechnicalInterviewsEntity } from '../technical-interviews/technical-interviews.entity';
import { ReturnsEntity } from '../returns/returns.entity';

@Entity({ name: 'jobs' })
export class JobsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requester: string;

  @Column()
  status: Status;

  @Column()
  publish: boolean;

  @Column()
  client: string;

  @Column({ type: 'int' })
  typeOfJob: Type;

  @Column()
  temporary: boolean;

  @Column()
  monthTime: string;

  @Column()
  jobName: string;

  @Column()
  startForecast: Date;

  @Column({ type: 'int' })
  jobNumber: number;

  @Column({ type: 'int' })
  typeOfContract: TypeOfContract;

  @Column({ type: 'int' })
  workplace: Workplace;

  @Column()
  workingDay: string;

  @Column({ type: 'numeric' })
  minimumValue: number;

  @Column({ type: 'numeric' })
  maximumValue: number;

  @Column({ type: 'int' })
  schooling: Schooling;

  @Column()
  collaboratorActivities: string;

  @Column()
  skills: string;

  @Column()
  attitudes: string;

  @Column()
  openingDate: Date;

  @OneToMany(() => LanguagesEntity, (languages) => languages.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  Languages: LanguagesEntity[];

  @OneToMany(() => KnowledgesEntity, (Knowledges) => Knowledges.Job, {
    cascade: ['insert', 'update', 'soft-remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  Knowledges: KnowledgesEntity[];

  @OneToOne(() => SenioritiesEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  Seniorities: SenioritiesEntity;

  @ManyToMany(
    () => BehaviroalInterviewsEntity,
    (behavioral) => behavioral.jobs,
    {
      cascade: ['insert', 'update', 'soft-remove'],
      eager: true,
    },
  )
  @JoinTable({
    name: 'behavioral_interviews_jobs',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'behavioral_interviews_id' },
  })
  BehavioralInterviews: BehaviroalInterviewsEntity[];

  @ManyToMany(() => TechnicalInterviewsEntity, (technical) => technical.jobs, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinTable({
    name: 'technical_interviews_jobs',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'technical_interviews_id' },
  })
  TechnicalInterviews: TechnicalInterviewsEntity[];

  @ManyToMany(() => ClientInterviewsEntity, (client) => client.jobs, {
    cascade: ['insert', 'update', 'soft-remove'],
    eager: true,
  })
  @JoinTable({
    name: 'client_interviews_jobs',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'client_interviews_id' },
  })
  ClientInterviews: ClientInterviewsEntity[];

  // @OneToOne(() => ReturnsEntity, {
  //   cascade: ['insert', 'update', 'soft-remove'],
  //   eager: true,
  // })
  // @JoinColumn()
  // returns: ReturnsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
