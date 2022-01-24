import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobsEntity } from "../jobs/jobs.entity";

@Entity({ name: 'languages' })
export class LanguagesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'language_name' })
    languageName: string;

    @Column({ name: 'degree_of_influence', type: 'int' })
    degreeOfInfluence: degreeOfInfluence;

    @ManyToMany(() => JobsEntity, job => job.Languages)
    jobs: JobsEntity[];
}
