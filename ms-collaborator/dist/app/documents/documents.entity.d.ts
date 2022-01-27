import { CollaboratorsEntity } from "../collaborators/collaborators.entity";
export declare class DocumentsEntity {
    id: string;
    name: string;
    file: string;
    Collaborator: CollaboratorsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
