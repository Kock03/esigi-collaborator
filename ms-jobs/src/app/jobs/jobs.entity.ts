import { BeforeRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { KnowledgesEntity } from "../knowledges/knowledges.entity";
import { Schooling } from "./dtos/schooling.enum";
import { Status } from "./dtos/status.enum";
import { Type } from "./dtos/type.enum";
import { TypeOfContract } from "./dtos/typeOfContract.enum";
import { Workplace } from "./dtos/workplace.enum";
import { SenioritiesEntity } from "../seniorities/seniorities.entity";
import { LanguagesEntity } from "../languages/languages.entity";

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
    cascade: ['insert', 'update', 'soft-remove']  ,
    orphanedRowAction: 'delete',
  })
  Languages: LanguagesEntity[];

  @OneToMany(() => KnowledgesEntity, (Knowledges) => Knowledges.Job, {
    cascade: ['insert', 'update', 'soft-remove']  ,
    orphanedRowAction: 'delete',
  })
  Knowledges: KnowledgesEntity[];

  @OneToOne(() => SenioritiesEntity, seniority => seniority.Job) 
  Senorities: SenioritiesEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeRemove()
  setDate(event: any) {
  }

}