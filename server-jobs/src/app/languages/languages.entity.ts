import { BeforeRemove, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JobsEntity } from "../jobs/jobs.entity";
import { degreeOfInfluence } from "./dtos/degree-of-influence";

@Entity({ name: 'languages' })
export class LanguagesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'language_name' })
    languageName: string;

    @Column({ name: 'degree_of_influence', type: 'int' })
    degreeOfInfluence: degreeOfInfluence;

    @ManyToOne(() => JobsEntity, job => job.Languages,{ onDelete: "CASCADE" })
    Job: JobsEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;



}
