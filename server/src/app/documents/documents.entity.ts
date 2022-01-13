import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";

@Entity({ name: 'documents' })
export class DocumentsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'file', type: 'blob' })
    file: string;

    @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.Documents)
    Collaborator: CollaboratorsEntity;

}