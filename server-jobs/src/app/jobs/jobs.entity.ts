import { BeforeRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { KnowledgesEntity } from "../knowledges/knowledges.entity";
import { LanguagesEntity } from "../languages/languages.entity";
import { Schooling } from "./dtos/schooling.enum";
import { Seniority } from "./dtos/seniority.enum";
import { Status } from "./dtos/status.enum";
import { Type } from "./dtos/type.enum";
import { TypeOfContract } from "./dtos/typeOfContract.enum";
import { Workplace } from "./dtos/workplace.enum";

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
  seniority: Seniority;

  @Column({ type: 'int' })
  jobNumber: number;

  @Column({ type: 'int' })
  typeOfContract: TypeOfContract;

  @Column({ type: 'int' })
  workplace: Workplace;

  @Column()
  workingDay: string;

  @Column()
  yearsExperience: number;

  @Column({ type: 'numeric' })
  minimumValue: number;

  @Column({ type: 'numeric' })
  maximumValue: number;

  @Column({ type: 'int' })
  schooling: Schooling;

  @Column()
  collaboratorActivities: string;

  @OneToMany(() => KnowledgesEntity, (knowledges) => knowledges.Job, {
    cascade: ['insert', 'update', 'soft-remove']  ,
    orphanedRowAction: 'delete',
  })
  knowledges: KnowledgesEntity[];

  @Column()
  skills: string;

  @Column()
  attitudes: string;

  @Column()
  openingDate: Date;

  @OneToMany(() => LanguagesEntity, (languages) => languages.Job, {
    cascade: ['insert', 'update', 'soft-remove']  ,
    orphanedRowAction: 'delete',
  })
  Languages: LanguagesEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeRemove()
  setDate(event: any) {
    console.log(event)
  }

}