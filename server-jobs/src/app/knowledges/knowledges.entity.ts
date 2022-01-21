import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { JobsEntity } from "../jobs/jobs.entity";
import { TypeOfPeriod } from "./dtos/typeOfPeriod.enum";

@Entity({ name: 'knowledges' })
export class KnowledgesEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({type: 'int'})
  yearsExperience: number;

  @Column({type:'int'})
  typeOfPeriod: TypeOfPeriod;

  @ManyToOne(() => JobsEntity, job => job.knowledges,{ onDelete: "CASCADE" })
  Job: JobsEntity;

}