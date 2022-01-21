import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";
import {JobsEntity} from "../../../../server-jobs/src/app/jobs/jobs.entity";

@Entity({ name: 'languages' })
export class LanguagesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'language_name' })
    languageName: string;

    @Column({ name: 'degree_of_influence', type: 'int' })
    degreeOfInfluence: degreeOfInfluence;

    @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.Languages)
    Collaborator: CollaboratorsEntity;

    @ManyToOne(() => JobsEntity, job => job.Languages)
    Job: JobsEntity;
}
