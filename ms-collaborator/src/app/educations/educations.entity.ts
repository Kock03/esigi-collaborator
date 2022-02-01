import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";
import { Schooling } from "./dtos/schooling.enum";

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}