import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";

@Entity({name:'educations'})
export class EducationsEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'schooling' })
    schooling: Schooling;

    @Column({ name: 'course' })
    course: string;

    @Column({ name: 'institution'})
    institution: string;

    @Column({ name: 'situation', type:'int'})
    situation: Situation;

    @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.Educations)
    Collaborator: CollaboratorsEntity;

}