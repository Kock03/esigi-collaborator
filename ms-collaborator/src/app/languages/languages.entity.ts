import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CollaboratorsEntity } from "../collaborators/collaborators.entity";

@Entity({ name: 'languages' })
export class LanguagesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'language_name' })
    languageName: string;

    @Column()
    degreeOfInfluence: string;

    @ManyToOne(() => CollaboratorsEntity, collaborator => collaborator.Languages)
    Collaborator: CollaboratorsEntity;
}
